import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
    setupAuthorizationHeaderOnRequestInterceptor,
    extractDataOnResponseInterceptor,
    configureDefaultRetryInterceptor
} from '../../src/utils/axios-utils';

jest.useFakeTimers();

const authorizationValue = 'test-authorization-value';
const mockedAuthentication = {
    getAuthorizationHeaderValue: jest.fn(() => Promise.resolve(authorizationValue))
};

let classUnderTest: AxiosInstance;
let axiosRequestConfig: AxiosRequestConfig;

beforeEach(() => {
    classUnderTest = axios.create();
    axiosRequestConfig = {};
})

describe('when setupAuthorizationHeaderOnRequestInterceptor is called', () => {
    describe('sets up a request handler which', () => {

        beforeEach(() => {
            axiosRequestConfig = {
                headers: {
                    'content-length': 'application-json',
                    'test-header': 'test-value'
                }
            };

            setupAuthorizationHeaderOnRequestInterceptor(classUnderTest, mockedAuthentication);
        });

        test('removes auth field from axios request config', () => {
            let auth = {
                username: 'user',
                password: 'pass'
            };
            axiosRequestConfig = {...axiosRequestConfig, auth};

            let fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            return fullfilledHandler(axiosRequestConfig)
                .then(adjustedConfig => expect(adjustedConfig.auth).not.toBeDefined());
        });

        test('populates headers field with Authorization header', () => {
            let fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;

            return fullfilledHandler(axiosRequestConfig)
                .then(adjustedConfig => expect(adjustedConfig.headers.Authorization).toEqual(authorizationValue));
        });
    });
});

describe('when extractDataOnResponseInterceptor is called', () => {
    describe('sets up a response handler which', () => {

        test('and ok response then only data object is returned in promise', () => {
            extractDataOnResponseInterceptor(classUnderTest);

            let fullfilledHandler = classUnderTest.interceptors.response['handlers'][0].fulfilled;
            let responseObject = {
                data: {
                    test: 'test-value'
                },
                status: 200,
                otherObject: {
                    other: 'other-data',
                }
            };

            return fullfilledHandler(responseObject)
                .then(actualdata => expect(actualdata).toEqual(responseObject.data));
        });
    });
});

describe('when configureDefaultRetryInterceptor is called', () => {
    let retryConfig;

    beforeEach(() => {
        retryConfig = {
            maxRetries: 1,
            retryBackoff: 2500,
            instance: classUnderTest
        };

        configureDefaultRetryInterceptor(classUnderTest);
    });

    describe('sets up a request handler which', () => {

        test('sets default retry configuration if it is not provided', () => {
            let fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            let adjustedRequestConfig = fullfilledHandler(axiosRequestConfig);

            expect(adjustedRequestConfig.retryConfig).toStrictEqual({
                currentAttempt: 0,
                maxRetries: 0,
                retryBackoff: 0,
                instance: classUnderTest
            })
        });

        test('sets the provided retry configuration', () => {
            axiosRequestConfig = {...axiosRequestConfig, ...{ retryConfig }}

            let fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            let adjustedRequestConfig = fullfilledHandler(axiosRequestConfig);

            expect(adjustedRequestConfig.retryConfig).toStrictEqual({
                ...retryConfig,
                ...{ currentAttempt: 0 }
            })
        });
    });

    describe('sets response handler which', () => {
        let error;
        let errorWithRetryConfig;
        let onRejectedHandler;

        beforeEach(() => {
            error = {
                config: axiosRequestConfig
            };
            errorWithRetryConfig = {
                config: {
                    ...axiosRequestConfig,
                    retryConfig: {
                        currentAttempt: 0,
                        maxRetries: 5,
                        retryBackoff: 2500,
                        instance: classUnderTest
                    }
                }
            };
            onRejectedHandler = classUnderTest.interceptors.response['handlers'][0].rejected;
        });

        test('rejects the request if retry config is not present', () => {
            return onRejectedHandler(error)
                .catch(actualError => {
                    expect(actualError).toBe(error);
                });
        });

        test('rejects the request if instance is not present in retry config', () => {
            errorWithRetryConfig.config.retryConfig.instance = undefined;

            return onRejectedHandler(errorWithRetryConfig)
                .catch(actualError => {
                    expect(actualError).toBe(errorWithRetryConfig);
                });
        });

        test('rejects the request if it is canceled', () => {
            let originalIsCancel = axios.isCancel;
            axios.isCancel = jest.fn().mockReturnValue(true);

            return onRejectedHandler(errorWithRetryConfig)
                .catch(actualError => {
                    expect(actualError).toBe(errorWithRetryConfig);
                    axios.isCancel = originalIsCancel;
                });
        });

        test('rejects the request if current attempts are more than max retries', () => {
            errorWithRetryConfig.config.retryConfig.currentAttempt = 5;

            return onRejectedHandler(errorWithRetryConfig)
                .catch(actualError => {
                    expect(actualError).toBe(errorWithRetryConfig);
                });
        });

        test('retries the request', () => {
            classUnderTest.request = jest.fn();

            let promise = onRejectedHandler(errorWithRetryConfig)
            .then(_success => {
                errorWithRetryConfig.config.retryConfig.currentAttempt = 1;
                expect(classUnderTest.request).toHaveBeenCalledWith(errorWithRetryConfig.config);
            });

            jest.advanceTimersByTime(errorWithRetryConfig.config.retryConfig.retryBackoff);

            return promise;
        });
    });
});