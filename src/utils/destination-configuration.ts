import axios, { AxiosInstance } from 'axios';
import { setupAuthorizationHeaderOnRequestInterceptor } from './axios-utils';
import { BasicAuthentication, OAuthAuthentication } from '../authentication';
import { KeyStore, KeystoreFormat } from './key-store';

export interface Credentials {
    /**
     * Username
     */
    username: string;
    /**
     * Password
     */
    password: string;
    /**
     * Destination name
     */
    destinationName: string;
    /**
     * Destination service configuration URL used to retrieve destination
     */
    destinationServiceBaseUrl: string;
    /**
     * Oauth token URL used to retrieve access token
     */
    oAuthTokenUrl: string;
}

/**
 * Destination Service Configuration class. Retrieves the destination from Destination service and build authentication context
 */
export class DestinationConfiguration {
    private axiosInstance: AxiosInstance;
    private static readonly DESTINATION_PATH = '/destination-configuration/v1/destinations/';
    private static readonly BASIC_AUTHENTICATION = 'BasicAuthentication';
    private static readonly OAUTH_2_CLIENT_CREDENTIALS = 'OAuth2ClientCredentials';
    private static readonly CLIENT_CERTIFICATE_AUTHENTICATION = 'ClientCertificateAuthentication';
    private static readonly END_ENCRYPTED_PRIVATE_KEY = '-----END ENCRYPTED PRIVATE KEY-----';
    private static readonly END_PRIVATE_KEY = '-----END PRIVATE KEY-----';
    /**
     * Creates an instance of DestinationServiceConfiguration.
     *
     * @param {Credentials} config - contains username, password, destinationName, destinationUrl and oAuthTokenUrl. All
     * of them must be provided else Error will be thrown.
     */
    constructor(config: Credentials) {
        if (!config) {
            throw new Error('Configuration cannot be null, undefined or empty object');
        }

        if (
            !config.username ||
            !config.password ||
            !config.destinationName ||
            !config.destinationServiceBaseUrl ||
            !config.oAuthTokenUrl
        ) {
            throw new Error(
                'Username, password, destinationName, destinationUrl and oAuthTokenUrl configuration must be provided'
            );
        }
        const oAuthAuthentication = new OAuthAuthentication({
            username: config.username,
            password: config.password,
            oAuthTokenUrl: config.oAuthTokenUrl
        });

        const axiosRequestConfig = {
            baseURL:
                config.destinationServiceBaseUrl +
                DestinationConfiguration.DESTINATION_PATH +
                config.destinationName,
            timeout: 2500,
            retryConfig: {
                maxRetries: 3,
                retryBackoff: 1000
            }
        };

        this.axiosInstance = axios.create(axiosRequestConfig);
        setupAuthorizationHeaderOnRequestInterceptor(
            this.axiosInstance,
            Promise.resolve(oAuthAuthentication)
        );
    }

    // eslint-disable-next-line require-jsdoc
    async getAuthentication(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request({})
                .then((destination) => {
                    const destinationConfiguration = destination.data.destinationConfiguration;
                    if (
                        destinationConfiguration.Authentication ==
                        DestinationConfiguration.BASIC_AUTHENTICATION
                    ) {
                        return resolve(
                            new BasicAuthentication({
                                username: destinationConfiguration.User,
                                password: destinationConfiguration.Password
                            })
                        );
                    }
                    if (
                        destinationConfiguration.Authentication ==
                        DestinationConfiguration.OAUTH_2_CLIENT_CREDENTIALS
                    ) {
                        return resolve(
                            new OAuthAuthentication({
                                username: destinationConfiguration.clientId,
                                password: destinationConfiguration.clientSecret,
                                oAuthTokenUrl: destinationConfiguration.tokenServiceURL
                            })
                        );
                    }
                    if (
                        destinationConfiguration.Authentication ==
                        DestinationConfiguration.CLIENT_CERTIFICATE_AUTHENTICATION
                    ) {
                        return resolve(this.buildKeyStore(destination.data));
                    }
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }

    // eslint-disable-next-line require-jsdoc
    private buildKeyStore(destination: any): KeyStore {
        const keyStoreFormat = destination.certificates[0].Name.substr(
            destination.certificates[0].Name.length - 3
        );
        if (keyStoreFormat == KeystoreFormat.JKS) {
            return this.buildJksKeyStore(
                destination.certificates[0].Content,
                destination.destinationConfiguration.KeyStorePassword
            );
        }
        if (keyStoreFormat == KeystoreFormat.PEM) {
            return this.buildPemKeyStore(
                destination.certificates[0].Content,
                destination.destinationConfiguration.KeyStorePassword
            );
        } else {
            return this.buildP12KeyStore(
                destination.certificates[0].Content,
                destination.destinationConfiguration.KeyStorePassword
            );
        }
    }

    // eslint-disable-next-line require-jsdoc
    private decodeKeyStore(keyStore: string): Buffer {
        return Buffer.from(keyStore, 'base64');
    }

    // eslint-disable-next-line require-jsdoc
    private retrieveDelimiterForPem(password: string): string {
        if (password == '') {
            return DestinationConfiguration.END_PRIVATE_KEY;
        } else {
            return DestinationConfiguration.END_ENCRYPTED_PRIVATE_KEY;
        }
    }

    // eslint-disable-next-line require-jsdoc
    private buildPemKeyStore(encodedKeyStore: string, password: string): KeyStore {
        const keyStore = this.decodeKeyStore(encodedKeyStore)
            .toString()
            .split(this.retrieveDelimiterForPem(password));
        const key = keyStore[0] + this.retrieveDelimiterForPem(password);
        const certificate = keyStore[1];
        return new KeyStore(KeystoreFormat.PEM, password, undefined, certificate, key);
    }

    // eslint-disable-next-line require-jsdoc
    private buildP12KeyStore(encodedKeyStore: string, password: string): KeyStore {
        const keyStore = this.decodeKeyStore(encodedKeyStore);
        return new KeyStore(KeystoreFormat.PFX, password, keyStore, undefined, undefined);
    }

    // eslint-disable-next-line require-jsdoc
    private buildJksKeyStore(encodedKeyStore: string, password: string): KeyStore {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const jks = require('jks-js');
        const pemKeyStore = jks.toPem(this.decodeKeyStore(encodedKeyStore), password);
        const commonName = Object.keys(pemKeyStore).toString();
        return new KeyStore(
            KeystoreFormat.JKS,
            password,
            undefined,
            pemKeyStore[commonName].cert,
            pemKeyStore[commonName].key
        );
    }
}
