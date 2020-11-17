import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Authentication } from '../authentication';

export interface RetryConfig {
    /**
     * Maximum number of retries.
     */
    maxRetries: number;
    /**
     * Timeout in milliseconds used to wait before executing the next retry.
     */
    retryBackoff: number;
}

interface RetryConfigInternal extends RetryConfig {
    /**
     * Current attempt of the retry.
     */
    currentAttempt: number;
    /**
     * Axios instance.
     */
    instance: AxiosInstance;
}

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
    retryConfig?: RetryConfigInternal;
}

/**
 * Sets up a request interceptor which adds the Authorization header value, for the given authentication object,
 * also removes auth field from the current axios request config.
 *
 * @param {AxiosInstance} axiosInstance - given axios instance
 * @param {Authentication} authentication - authentication object, which will take care of getting
 * the authorization header value
 */
export function setupAuthorizationHeaderOnRequestInterceptor(
    axiosInstance: AxiosInstance,
    authentication: Authentication
): void {
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) =>
            authentication
                .getAuthorizationHeaderValue()
                .then((headerValue) => {
                    const headers = { ...config.headers, ...{ Authorization: headerValue } };
                    let auth;
                    return { ...config, ...{ headers, auth } };
                })
                .catch((error) => Promise.reject(error)),
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );
}

/**
 * Sets up a response interceptor which extracts the data when response is successful.
 *
 * @param {AxiosInstance} axiosInstance - given axios instance
 */
export function extractDataOnResponseInterceptor(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => Promise.resolve(response.data),
        (error: AxiosError) => Promise.reject(error)
    );
}

/**
 * Sets up request and retry interceptors for the given axios instance. These interceptors
 * will take care of the retry on failure logic.
 *
 * The request interceptor will populate and adjust the retry configuration in axios request configuration
 * on each request. If  etry configuration is not present maxRetries, retryBackoff will be set to 0.
 *
 * The response interceptor holds the retry logic, it will retry the request in the following cases:
 * - retry configuration and axios instance are present
 * - axios request is not canceled
 * - current attempt is not greater or equal than the maxRetries property
 *
 * @param {AxiosInstance} axiosInstance - given axios instance
 */
export function configureDefaultRetryInterceptor(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use(
        (config: ExtendedAxiosRequestConfig) => {
            const defaultRetryConfig = {
                currentAttempt: config.retryConfig?.currentAttempt || 0,
                maxRetries: config.retryConfig?.maxRetries || 0,
                retryBackoff: config.retryConfig?.retryBackoff || 0,
                instance: axiosInstance
            };
            return {
                ...config,
                ...{ retryConfig: { ...defaultRetryConfig, ...config.retryConfig } }
            };
        },
        (error: AxiosError) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            let config = error.config as ExtendedAxiosRequestConfig;

            if (!config.retryConfig) {
                return Promise.reject(error);
            }

            const { retryConfig } = config;
            const axiosInstance = retryConfig.instance as AxiosInstance;

            if (axios.isCancel(error) || !axiosInstance) {
                return Promise.reject(error);
            }

            let currentAttempt = retryConfig.currentAttempt || 0;
            const maxRetries = retryConfig.maxRetries || 0;

            if (currentAttempt >= maxRetries) {
                return Promise.reject(error);
            }

            const retryBackoff = retryConfig.retryBackoff || 0;

            config = {
                ...config,
                ...{
                    retryConfig: {
                        currentAttempt: ++currentAttempt,
                        instance: axiosInstance,
                        maxRetries,
                        retryBackoff
                    }
                }
            };

            return new Promise((resolve) =>
                setTimeout(() => {
                    resolve(axiosInstance.request(config));
                }, retryBackoff)
            );
        }
    );
}
