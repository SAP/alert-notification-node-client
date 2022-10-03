import axios, { AxiosRequestConfig } from 'axios';
import {
    BasicAuthentication,
    CertificateAuthentication,
    OAuthAuthentication
} from '../src/authentication';
import { configureDefaultRetryInterceptor } from '../src/utils/axios-utils';

jest.mock('axios');
jest.mock('../src/utils/axios-utils');

const username = 'username';
const password = 'password';
const certificate = 'certificate';
const privateKey = 'privateKey';
const credentials = { username, password };
const oAuthCredentialsWithCertificate = { username, certificate, privateKey };
const testUrl = 'test-url';

beforeEach(() => {
    axios.create = jest.fn((_config: AxiosRequestConfig) => axios);
});

describe('BasicAuthentication', () => {
    test('can be correctly instantiated', () => {
        expect(new BasicAuthentication(credentials)).toBeDefined();
    });

    test('when getAuthorizationHeaderValue is called then correct value is returned', () => {
        let expectedValue = `Basic ${Buffer.from(
            `${credentials.username}:${credentials.password}`
        ).toString('base64')}`;
        return new BasicAuthentication(credentials)
            .getAuthorizationHeaderValue()
            .then((actualValue) => expect(actualValue).toBe(expectedValue));
    });
});

describe('OAuthAuthentication', () => {
    let oauthResponse: { data: { access_token: string; expires_in: number } };

    beforeEach(() => {
        oauthResponse = {
            data: {
                access_token: 'test-token',
                expires_in: Date.now() + 50000000
            }
        };
        axios.request = jest.fn().mockImplementation(() => Promise.resolve(oauthResponse));
    });

    test('can be correctly instantiated', () => {
        expect(
            new OAuthAuthentication({
                oAuthTokenUrl: testUrl,
                ...credentials
            })
        ).toBeDefined();
    });

    test('can be correctly instantiated with certificate', () => {
        expect(new OAuthAuthentication({
            oAuthTokenUrl: testUrl,
            ...oAuthCredentialsWithCertificate
        })).toBeDefined();
    });

    test('on instantiation retry interceptor is set', () => {
        new OAuthAuthentication({
            oAuthTokenUrl: testUrl,
            ...credentials
        });

        expect(configureDefaultRetryInterceptor).toBeCalledTimes(1);
    });

    test('correct axios request config is set', () => {
        new OAuthAuthentication({
            oAuthTokenUrl: testUrl,
            ...credentials
        });

        expect(axios.create).toHaveBeenCalledWith({
            auth: {
                username: credentials.username,
                password: credentials.password
            },
            baseURL: testUrl,
            timeout: 5000,
            params: {
                grant_type: 'client_credentials'
            },
            retryConfig: {
                maxRetries: 3,
                retryBackoff: 1000
            }
        });
    });

    describe('when getAuthorizationHeaderValue is called', () => {
        let classUnderTest: OAuthAuthentication;

        beforeEach(() => {
            classUnderTest = new OAuthAuthentication({
                oAuthTokenUrl: 'test-url',
                ...credentials
            });
        });

        test('promise is resolved with token value', () => {
            return classUnderTest
                .getAuthorizationHeaderValue()
                .then((actualValue) =>
                    expect(actualValue).toEqual(`Bearer ${oauthResponse.data.access_token}`)
                );
        });

        test('promise with oAuth certificate is resolved with token value', () => {
            classUnderTest = new OAuthAuthentication({
                oAuthTokenUrl: 'test-url',
                ...oAuthCredentialsWithCertificate
            });
            return classUnderTest.getAuthorizationHeaderValue()
                .then((actualValue) => expect(actualValue).toEqual(`Bearer ${oauthResponse.data.access_token}`));
        });

        test('promise is rejected when request to OAuth provider fails', () => {
            let error = {
                status: 400,
                data: {
                    message: 'bad request'
                }
            };

            axios.request = jest.fn().mockImplementationOnce(() => Promise.reject(error));

            return classUnderTest
                .getAuthorizationHeaderValue()
                .catch((actualError) => expect(actualError).toEqual(error));
        });

        test('when token is not expired request is not executed', () => {
            return classUnderTest.getAuthorizationHeaderValue()
                .then(() => {
                    return classUnderTest.getAuthorizationHeaderValue()
                        .then(() => expect(axios.request).toHaveBeenCalledTimes(1));
                });
        });

        test('when token is expired request is executed', () => {
            oauthResponse.data.expires_in = -10000;

            return classUnderTest.getAuthorizationHeaderValue()
                .then(() => {
                    return classUnderTest.getAuthorizationHeaderValue()
                        .then(() => expect(axios.request).toHaveBeenCalledTimes(2));
                });
        });
    });
});

describe('CertificatеAuthentication', () => {
    const classUnderTest = new CertificateAuthentication({
        certificate: certificate,
        privateKey: privateKey
    });
    test('can be correctly instantiated', () => {
        expect(new CertificateAuthentication({ certificate, privateKey })).toBeDefined();
    });

    test('when getCertificate is called then correct value is returned', () => {
        expect(classUnderTest.getCertificate()).toBe(certificate);
    });

    test('when getPrivateKey is called then correct value is returned', () => {
        expect(classUnderTest.getPrivateKey()).toBe(privateKey);
    });
});
