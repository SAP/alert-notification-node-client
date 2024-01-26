import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
    configureDefaultRetryInterceptor,
    extractDataOnResponseInterceptor,
    setupAuthorizationHeaderOnRequestInterceptor
} from '../../src/utils/axios-utils';
import { KeyStore, KeystoreFormat } from '../../src/utils/key-store';

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
});

describe('when setupAuthorizationHeaderOnRequestInterceptor is called', () => {
    describe('sets up a request handler when destination is provided', () => {
        test('build httpsAgent with pem keystore', () => {
            const keyStore = new KeyStore(
                KeystoreFormat.P12,
                'passphrase',
                Buffer.from('keystore'),
                null,
                null
            );
            setupAuthorizationHeaderOnRequestInterceptor(classUnderTest, Promise.resolve(keyStore));

            const fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            return fullfilledHandler(axiosRequestConfig).then((adjustedConfig) => {
                expect(adjustedConfig.httpsAgent.options.pfx).toBeDefined();
                expect(adjustedConfig.httpsAgent.options.passphrase).toBe('passphrase');
                expect(adjustedConfig.httpsAgent.options.cert).toBeUndefined();
                expect(adjustedConfig.httpsAgent.options.key).toBeUndefined();
            });
        });

        test('build httpsAgent with jks keystore', () => {
            const keyStore = new KeyStore(KeystoreFormat.JKS, 'passphrase', null, 'cert', 'key');
            setupAuthorizationHeaderOnRequestInterceptor(classUnderTest, Promise.resolve(keyStore));

            const fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            return fullfilledHandler(axiosRequestConfig).then((adjustedConfig) => {
                expect(adjustedConfig.httpsAgent.options.pfx).toBeUndefined();
                expect(adjustedConfig.httpsAgent.options.passphrase).toBe('passphrase');
                expect(adjustedConfig.httpsAgent.options.cert).toBeDefined();
                expect(adjustedConfig.httpsAgent.options.key).toBeDefined();
            });
        });
    });

    describe('sets up a request handler which', () => {
        beforeEach(() => {
            axiosRequestConfig = {
                headers: {
                    'content-length': 'application-json',
                    'test-header': 'test-value'
                }
            };

            setupAuthorizationHeaderOnRequestInterceptor(
                classUnderTest,
                Promise.resolve(mockedAuthentication)
            );
        });

        test('removes auth field from axios request config', () => {
            const auth = {
                username: 'user',
                password: 'pass'
            };
            axiosRequestConfig = { ...axiosRequestConfig, auth };

            const fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            return fullfilledHandler(axiosRequestConfig).then((adjustedConfig) =>
                expect(adjustedConfig.auth).not.toBeDefined()
            );
        });

        test('populates headers field with Authorization header', () => {
            const fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;

            return fullfilledHandler(axiosRequestConfig).then((adjustedConfig) =>
                expect(adjustedConfig.headers.Authorization).toEqual(authorizationValue)
            );
        });
    });
});

describe('when extractDataOnResponseInterceptor is called', () => {
    describe('sets up a response handler which', () => {
        test('and ok response then only data object is returned in promise', () => {
            extractDataOnResponseInterceptor(classUnderTest);

            const fullfilledHandler = classUnderTest.interceptors.response['handlers'][0].fulfilled;
            const responseObject = {
                data: {
                    test: 'test-value'
                },
                status: 200,
                otherObject: {
                    other: 'other-data'
                }
            };

            return fullfilledHandler(responseObject).then((actualdata) =>
                expect(actualdata).toEqual(responseObject.data)
            );
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
            const fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            const adjustedRequestConfig = fullfilledHandler(axiosRequestConfig);

            expect(adjustedRequestConfig.retryConfig).toStrictEqual({
                currentAttempt: 0,
                maxRetries: 0,
                retryBackoff: 0,
                instance: classUnderTest
            });
        });

        test('sets the provided retry configuration', () => {
            axiosRequestConfig = { ...axiosRequestConfig, ...{ retryConfig } };

            const fullfilledHandler = classUnderTest.interceptors.request['handlers'][0].fulfilled;
            const adjustedRequestConfig = fullfilledHandler(axiosRequestConfig);

            expect(adjustedRequestConfig.retryConfig).toStrictEqual({
                ...retryConfig,
                ...{ currentAttempt: 0 }
            });
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
            return onRejectedHandler(error).catch((actualError) => {
                expect(actualError).toBe(error);
            });
        });

        test('rejects the request if instance is not present in retry config', () => {
            errorWithRetryConfig.config.retryConfig.instance = undefined;

            return onRejectedHandler(errorWithRetryConfig).catch((actualError) => {
                expect(actualError).toBe(errorWithRetryConfig);
            });
        });

        test('rejects the request if it is canceled', () => {
            const originalIsCancel = axios.isCancel;
            jest.spyOn(axios, 'isCancel').mockReturnValue(true);

            return onRejectedHandler(errorWithRetryConfig).catch((actualError) => {
                expect(actualError).toBe(errorWithRetryConfig);
                axios.isCancel = originalIsCancel;
            });
        });

        test('rejects the request if current attempts are more than max retries', () => {
            errorWithRetryConfig.config.retryConfig.currentAttempt = 5;

            return onRejectedHandler(errorWithRetryConfig).catch((actualError) => {
                expect(actualError).toBe(errorWithRetryConfig);
            });
        });

        test('retries the request', () => {
            classUnderTest.request = jest.fn();

            const promise = onRejectedHandler(errorWithRetryConfig).then((_success) => {
                errorWithRetryConfig.config.retryConfig.currentAttempt = 1;
                expect(classUnderTest.request).toHaveBeenCalledWith(errorWithRetryConfig.config);
            });

            jest.advanceTimersByTime(errorWithRetryConfig.config.retryConfig.retryBackoff);

            return promise;
        });
    });
});
