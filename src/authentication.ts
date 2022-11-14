import Axios, { AxiosInstance } from 'axios';
import { configureDefaultRetryInterceptor } from './utils/axios-utils';
import * as https from 'https';

export interface Credentials {
    /**
     * Username
     */
    username: string;
    /**
     * Password
     */
    password: string;
}

export interface OAuthConfig {
    /**
     * Username
     */
    username: string;
    /**
     * Password
     */
    password?: string;
    /**
     * Certificate
     */
    certificate?: string;
    /**
     * Private key
     */
    privateKey?: string;
    /**
     * OAuth token url to call on retrieving token
     */
    oAuthTokenUrl: string;
}

export interface CertificateConfig {
    /**
     * Certificate
     */
    certificate: string;
    /**
     * Private key
     */
    privateKey: string;
}

export interface Authentication {
    getAuthorizationHeaderValue(): Promise<string>;
}

/**
 * Basic Authentication class. Retrieves the basic authorization header value.
 */
export class BasicAuthentication implements Authentication {
    private basicAuthorizationHeader: string;

    /**
     * Creates an instance of BasicAuthentication
     *
     * @param {Credentials} creds - object which contains the username and password. Username and password
     * must be provided else an Error will be thrown.
     */
    constructor(creds: Credentials) {
        if (!creds) {
            throw new Error('Credentials must not be null or undefined');
        }

        if (!creds.username && !creds.password) {
            throw new Error('Username and password must be provided');
        }

        this.basicAuthorizationHeader = Buffer.from(`${creds.username}:${creds.password}`).toString(
            'base64'
        );
    }

    /**
     * Get basic authorization header value
     *
     * @return {Promise<string>} - promise containing the basic authorization header value
     */
    getAuthorizationHeaderValue(): Promise<string> {
        return Promise.resolve(`Basic ${this.basicAuthorizationHeader}`);
    }
}

/**
 * OAuth Authentication class. Retrieves the OAuth authorization header value.
 */
export class OAuthAuthentication implements Authentication {
    private static readonly EXPIRES_IN_KEY = 'expires_in';
    private static readonly ACCESS_TOKEN_KEY = 'access_token';
    private static readonly TIME_DELTA_IN_MILLIS = 60000;
    private static readonly HTTP_CLIENT_TIMEOUT = 5000;
    private static readonly APPLICATION_X_WWW_FORM_URLENCODED_CONTENT_TYPE =
        'application/x-www-form-urlencoded';
    private static readonly CLIENT_CREDENTIALS = 'client_credentials';

    private accessToken: string;
    private expiresIn: number;
    private axiosInstance: AxiosInstance;

    /**
     * Creates an instance of OAuthAuthentication.
     *
     * @param {OAuthConfig} config - contains username, password, oAuthTokenUrl and platform. All
     * of them must be provided else Error will be thrown.
     */
    constructor(config: OAuthConfig) {
        if (!config) {
            throw new Error('OAuth configuration must be provided');
        }

        if (!config.username) {
            throw new Error('Username must be provided');
        }

        if (!config.oAuthTokenUrl) {
            throw new Error('OAuthTokenUrl is missing.');
        }

        this.accessToken = '';
        this.expiresIn = 0;
        let defaultConfig = {
            retryConfig: {
                maxRetries: 3,
                retryBackoff: 1000
            },
            timeout: OAuthAuthentication.HTTP_CLIENT_TIMEOUT
        };
        if (this.isCertificateAuthentication(config)) {
            defaultConfig = {
                ...defaultConfig,
                ...{
                    baseURL: config.oAuthTokenUrl,
                    headers: {
                        'Content-Type':
                            OAuthAuthentication.APPLICATION_X_WWW_FORM_URLENCODED_CONTENT_TYPE
                    },
                    method: 'POST',
                    params: {
                        grant_type: OAuthAuthentication.CLIENT_CREDENTIALS,
                        client_id: `${config.username}`
                    },
                    httpsAgent: new https.Agent({
                        cert: config.certificate,
                        key: config.privateKey
                    })
                }
            };
        } else {
            if (!config.password) {
                throw new Error('Password is missing.');
            }
            defaultConfig = {
                ...defaultConfig,
                ...{
                    auth: {
                        username: config.username,
                        password: config.password
                    },
                    baseURL: config.oAuthTokenUrl,
                    params: {
                        grant_type: OAuthAuthentication.CLIENT_CREDENTIALS
                    }
                }
            };
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.axiosInstance = Axios.create(defaultConfig);
        configureDefaultRetryInterceptor(this.axiosInstance);
    }

    /**
     * Get OAuth authorization header value. If token is not present or is expired, the OAuth token url will
     * be called in order to get a new one or renew the old token.
     *
     * @return {Promise<string>} - promise containing the OAuth authorization header value
     */
    async getAuthorizationHeaderValue(): Promise<string> {
        const isTokenAboutToExpire = () => {
            return OAuthAuthentication.TIME_DELTA_IN_MILLIS > this.expiresIn - Date.now();
        };

        if (this.accessToken === '' || isTokenAboutToExpire()) {
            return this.renewToken()
                .then((data) => {
                    this.expiresIn = Date.now() + 1000 * data[OAuthAuthentication.EXPIRES_IN_KEY];
                    this.accessToken = data[OAuthAuthentication.ACCESS_TOKEN_KEY];

                    return Promise.resolve(`Bearer ${this.accessToken}`);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        }

        return Promise.resolve(`Bearer ${this.accessToken}`);
    }

    /* eslint-disable camelcase */
    /**
     * Renew OAuth token.
     *
     * @return {Promise<{ expires_in: number, access_token: string }>} - promise containing the response from OAuth server
     */
    private async renewToken(): Promise<{ expires_in: number; access_token: string }> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request({}) // No need to apply any other configuration
                .then((response) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }

    // eslint-disable-next-line require-jsdoc
    private isCertificateAuthentication(config: OAuthConfig): boolean {
        return !config.password && !!config.certificate && !!config.privateKey;
    }
}

/**
 * Certificate Authentication class. Provides the certificate and the private key for the building of the keystore.
 */
export class CertificateAuthentication {
    private certificate: string;
    private privateKey: string;
    /**
     * Creates an instance of CertificateServiceAuthentication
     *
     * @param {Credentials} creds - object which contains the certificate and private key. Certificate and privateKey
     * must be provided else an Error will be thrown.
     */
    constructor(creds: CertificateConfig) {
        if (!creds || !creds.certificate || !creds.privateKey) {
            throw new Error(
                'Both certificate and privateKey must be provided when using CertificateAuthentication'
            );
        }
        this.certificate = creds.certificate;
        this.privateKey = creds.privateKey;
    }

    // eslint-disable-next-line require-jsdoc
    public getCertificate(): string {
        return this.certificate;
    }
    // eslint-disable-next-line require-jsdoc
    public getPrivateKey(): string {
        return this.privateKey;
    }
}
