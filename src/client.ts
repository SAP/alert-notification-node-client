import axios, { AxiosRequestConfig } from 'axios';

import { BasicAuthentication, OAuthAuthentication, Authentication } from './authentication';

import { Region } from './utils/region';

import {
    setupAuthorizationHeaderOnRequestInterceptor,
    extractDataOnResponseInterceptor,
    configureDefaultRetryInterceptor,
    RetryConfig
} from './utils/axios-utils';

import ConfigurationApiClient from './configuration-api/configuration-client';
import {
    Action,
    Condition,
    Subscription,
    Configuration,
    EntityType
} from './configuration-api/models';

import EventsApiClient from './producer-api/event-producer-client';
import { ResourceEvent } from './producer-api/models';
import { PageResponse, CommonQueryParams } from './utils/common';
import { ConsumerPagedResponse, ConsumerQueryParameters } from './producer-api/models';

export interface AlertNotificationConfiguration {
    /**
     * Authentication to use for retrieving authorization header value.
     */
    authentication: BasicAuthentication | OAuthAuthentication | Authentication;
    /**
     * Region
     */
    region: Region;
    /**
     * Axios request config
     */
    axiosRequestConfig?: AxiosRequestConfig;
    /**
     * Retry configuration
     */
    retryConfig?: RetryConfig;
}

/**
 * Client used for accessing SAP Cloud Platform Alert Notification service APIs
 */
export default class AlertNotificationClient {
    private configurationClient: ConfigurationApiClient;
    private eventClient: EventsApiClient;

    /**
     * Constructs an instance of AlertNotificationClient. The instance provides an access to SAP Cloud Platform Alert Notification service APIs.
     * Construction of the instance can throw an error in the following cases:
     * - authentication and region are missing
     * - if retry configuration is present, but maxRetries and retryBackoff aren't
     *
     * During the construction some Axios interceptors will be set:
     * - Request and response interceptors for retriablity of request only if retry configuration is present.
     * - Request interceptor for setting up an Authorization header
     * - Response interceptor for extracting the data on successful response
     *
     * @param {AlertNotificationConfiguration} configuration - configuration object for the client. It consists of:
     * - authentication object - used to retrieve tha authorization header value
     * - region - used to retrieve platform and url of the SAP Cloud Platform Alert Notification service
     * - axiosRequestConfig - request configuration different from the default provided by the client
     * - retryConfig - retry configuration
     */
    constructor(configuration: AlertNotificationConfiguration) {
        if (!configuration) {
            throw new Error('Configuration must not be an empty object, undefined or null');
        }

        if (!configuration.authentication && !configuration.region) {
            throw new Error('Authentication and region objects are required');
        }

        const baseURL = configuration.region.getUrl();
        const platform = configuration.region.getPlatform();

        let axiosRequestConfig = {
            ...{ baseURL, timeout: 2500 },
            ...configuration.axiosRequestConfig
        };

        if (configuration.retryConfig) {
            if (!configuration.retryConfig.maxRetries && !configuration.retryConfig.retryBackoff) {
                throw new Error(
                    'maxRetries and retryBackoff are required properties when setting retry configuration'
                );
            }

            axiosRequestConfig = { ...axiosRequestConfig, ...configuration.retryConfig };
        }

        const axiosInstance = axios.create(axiosRequestConfig);

        if (configuration.retryConfig) {
            configureDefaultRetryInterceptor(axiosInstance);
        }

        setupAuthorizationHeaderOnRequestInterceptor(axiosInstance, configuration.authentication);
        extractDataOnResponseInterceptor(axiosInstance);

        this.eventClient = new EventsApiClient(platform, axiosInstance);
        this.configurationClient = new ConfigurationApiClient(platform, axiosInstance);
    }

    /**
     *
     * Get one configuration entity by specifying the type, e.g. 'Action', 'Condition' or 'Subscription' and its name
     *
     * @param {EntityType} type - type of the searched entity
     * @param {string} name - name of the searched entity
     *
     * @return {Promise<Action | Condition | Subscription>} - promise which contains the data for the searched entity based on
     * the given type
     */
    public get(type: EntityType, name: string): Promise<Action | Condition | Subscription> {
        return (this.configurationClient.getOne({ type, name }) as unknown) as Promise<
            Action | Condition | Subscription
        >;
    }

    /**
     *
     * Get all configuration entities by specifying the type, e.g. 'Action', 'Condition' or 'Subscription'. Also in order to adjust the returned
     * pages query parameters can be provided.
     *
     * @param {EntityType} type - type of the requested entities
     * @param {CommonQueryParams} params - query parameters
     *
     * @return {Promise<PageResponse<Action | Condition | Subscription >>} - promise which contains the paginated response for the searched entities
     * based on the given type
     *
     */
    public getAll(
        type: EntityType,
        params?: CommonQueryParams
    ): Promise<PageResponse<Action | Condition | Subscription>> {
        return (this.configurationClient.getAll({ type, params }) as unknown) as Promise<
            PageResponse<Action | Condition | Subscription>
        >;
    }

    /**
     *
     * Create a configuration entity by specifying of what type it will be, e.g. 'Action', 'Condition' or 'Subscription' and provide the data for
     * that entity.
     *
     * @param {EntityType} type - type of the to be created entity
     * @param {Action | Condition | Subscription} data - data of the entity, differentiates based on the type of the entity
     *
     * @return {Promise<Action | Condition | Subscription>} - promise which contains the data of the created entity based on
     * the given type
     */
    public create(
        type: EntityType,
        data: Action | Condition | Subscription
    ): Promise<Action | Condition | Subscription> {
        return (this.configurationClient.create({ type, data }) as unknown) as Promise<
            Action | Condition | Subscription
        >;
    }

    /**
     *
     * Update a configuration entity by specifying of what type it is, e.g. 'Action', 'Condition' or 'Subscription', its name and provide the data for
     * that entity with the its updated fields.
     *
     * @param {EntityType} type - type of the to be created entity
     * @param {Action | Condition | Subscription} data - data of the entity, differentiates based on the type of the entity
     *
     * @return {Promise<Action | Condition | Subscription>} - promise which contains the data of the updated entity based on
     * the given type
     */
    public update(
        type: EntityType,
        data: Action | Condition | Subscription
    ): Promise<Action | Condition | Subscription> {
        return (this.configurationClient.update({ type, data }) as unknown) as Promise<
            Action | Condition | Subscription
        >;
    }

    /**
     *
     * Delete a configuration entity by specifying of what type it is, e.g. 'Action', 'Condition' or 'Subscription' and its name.
     *
     * @param {EntityType} type - type of the to be deleted entity
     * @param {string} name - name of an already existent entity
     *
     * @return {Promise<void>} - promise which contains nothing
     */
    public delete(type: EntityType, name: string): Promise<void> {
        return (this.configurationClient.delete({ type, name }) as unknown) as Promise<void>;
    }

    /**
     *
     * Import a configuration. Note that this operation overwrites any existent configuration.
     *
     * @param {Configuration} data - configuration which consists of actions, conditions and subscriptions
     *
     * @return {Promise<Configuration>} - promise which contains the imported configuration
     */
    public importConfiguration(data: Configuration): Promise<Configuration> {
        return (this.configurationClient.import(data) as unknown) as Promise<Configuration>;
    }

    /**
     *
     * Export a configuration.
     *
     * @return {Promise<Configuration>} - promise which contains the current configuration
     */
    public exportConfiguration(): Promise<Configuration> {
        return (this.configurationClient.export() as unknown) as Promise<Configuration>;
    }

    /**
     *
     * Send an event for processing.
     *
     * @param {ResourceEvent} event - resource event to be sent to SAP Cloud Platform Alert Notification
     *
     * @return {Promise<ResourceEvent>} - promise which contains the ingested resource event
     */
    public sendEvent(event: ResourceEvent): Promise<ResourceEvent> {
        return (this.eventClient.sendEvent(event) as unknown) as Promise<ResourceEvent>;
    }

    /**
     *
     * Send events for processing.
     *
     * @param {ResourceEvent[]} events - resource events to be sent to SAP Cloud Platform Alert Notification
     *
     * @return {Promise<ResourceEvent>} - promise which contains the ingested resource events
     */
    public sendEvents(events: ResourceEvent[]): Promise<ResourceEvent[]> {
        return (this.eventClient.sendEvents(events) as unknown) as Promise<ResourceEvent[]>;
    }

    /**
     *
     * Get an event that is matched by a subscription/s.
     *
     * @param {string} eventId is the ID that was received in the response body when event was sent to SAP Cloud Platform Alert Notification
     * @param {ConsumerQueryParameters} params - for filtering of all available events (those could be more than one with the same ID due to multiple matched subscriptions)
     *
     * @return {Promise<ConsumerPagedResponse>} - promise which contains paginated response for the searched matched event
     */
    public getMatchedEvent(
        eventId: string,
        params?: ConsumerQueryParameters
    ): Promise<ConsumerPagedResponse> {
        return (this.eventClient.getMatchedEvents({ eventId, params }) as unknown) as Promise<
            ConsumerPagedResponse
        >;
    }

    /**
     *
     * Get events that are matched by a subscription/s.
     *
     * @param {ConsumerQueryParameters} params - for filtering of all available events
     *
     * @return {Promise<ConsumerPagedResponse>} - promise which contains paginated response for the searched matched events
     */
    public getMatchedEvents(params?: ConsumerQueryParameters): Promise<ConsumerPagedResponse> {
        return (this.eventClient.getMatchedEvents({ params }) as unknown) as Promise<
            ConsumerPagedResponse
        >;
    }

    /**
     *
     * Get event that was not delivered to some target.
     *
     * @param {string} eventId is the ID that was received in the response body when event was sent to SAP Cloud Platform Alert Notification
     * @param {CommonQueryParams} params for filtering of all available events (those could be more than one with the same ID due to multiple matched subscriptions)
     *
     * @return {Promise<ConsumerPagedResponse>} - promise which contains paginated response for the searched undelivered event
     */
    public getUndeliveredEvent(
        eventId: string,
        params?: CommonQueryParams
    ): Promise<ConsumerPagedResponse> {
        return (this.eventClient.getUndeliveredEvents({ eventId, params }) as unknown) as Promise<
            ConsumerPagedResponse
        >;
    }

    /**
     *
     * Get events that were not delivered to some target.
     *
     * @param {CommonQueryParams} params for filtering of all available events
     *
     * @return {Promise<ConsumerPagedResponse>} - promise which contains paginated response for the searched undelivered events
     */
    public getUndeliveredEvents(params?: ConsumerQueryParameters): Promise<ConsumerPagedResponse> {
        return (this.eventClient.getUndeliveredEvents({ params }) as unknown) as Promise<
            ConsumerPagedResponse
        >;
    }
}
