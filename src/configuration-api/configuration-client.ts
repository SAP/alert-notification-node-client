import { AxiosResponse, AxiosInstance, AxiosPromise } from 'axios';

import { PageResponse } from '../utils/common';

import {
    Action,
    Condition,
    Subscription,
    Configuration,
    ConfigurationRequest,
    EntityType
} from './models';

/**
 * Class used to access SAP Cloud Platform Alert Notification Configuration API
 */
export default class ConfigurationApiClient {
    private actionPath: string;
    private conditionPath: string;
    private subscriptionPath: string;
    private importPath: string;
    private exportPath: string;
    private axios: AxiosInstance;

    /**
     * Constructs an instance of ConfigurationApiClient
     *
     *
     * @param {string} platform - platform, which can be CloudFoundry or Neo,
     * used to decide which endpoints to call
     * @param {AxiosInstance} axios - http client used for making http requests
     *
     */
    constructor(platform: string, axios: AxiosInstance) {
        this.actionPath = `/${platform}/configuration/v1/action`;
        this.conditionPath = `/${platform}/configuration/v1/condition`;
        this.subscriptionPath = `/${platform}/configuration/v1/subscription`;
        this.importPath = `/${platform}/configuration/v1/configuration`;
        this.exportPath = `/${platform}/configuration/v1/configuration`;
        this.axios = axios;
    }

    /**
     * Executes a request which if successful will return a paged response
     * of the entities for the given type
     *
     * @param {ConfigurationRequest} request - an object which contains all the needed data for this request
     * to be executed:
     * - {type} - value which helps deduce the path to call
     * - {params} - query parameters to append to the url
     *
     * @return {AxiosPromise<PageResponse<Action | Condition | Subscription>>} promise,
     * which contains the paginated entities for the given type
     */
    public getAll({
        params = {},
        ...others
    }: ConfigurationRequest): AxiosPromise<PageResponse<Action | Condition | Subscription>> {
        return this.axios.request({
            method: 'get',
            url: this.choosePath(others.type),
            params
        });
    }

    /**
     * Executes a request which if successful will return the entity of
     * requested type and name
     *
     * @param {ConfigurationRequest} request - an object which contains all the needed data for this request
     * to be executed:
     * - {type} - value which helps deduce the path to call
     * - {name} - entity's identifier
     *
     * @return {AxiosPromise<Action | Condition | Subscription>} promise, which contains the entity
     * for the given type
     */
    public getOne({
        name = '',
        ...others
    }: ConfigurationRequest): AxiosPromise<Action | Condition | Subscription> {
        return this.axios.request({
            url: `${this.choosePath(others.type)}/${name}`,
            method: 'get'
        });
    }

    /**
     * Executes a request which if successful will create the given entity
     *
     * @param {ConfigurationRequest} request - an object which contains all the needed data for this request
     * to be executed.
     *
     * @return {AxiosPromise<Action | Condition | Subscription>} promise, which contains the created
     * entity
     */
    public create({
        data = {} as Action,
        ...others
    }: ConfigurationRequest): AxiosPromise<Action | Condition | Subscription> {
        return this.axios.request({
            method: 'post',
            url: this.choosePath(others.type),
            data
        });
    }

    /**
     * Executes a request which if successful will update the given entity
     *
     * @param {ConfigurationRequest} request - an object which contains all the needed data for this request
     * to be executed.
     *
     * @return {AxiosPromise<Action | Condition | Subscription>} promise, which contains the updated
     * entity
     */
    public update({
        data = {} as Action,
        ...others
    }: ConfigurationRequest): AxiosPromise<Action | Condition | Subscription> {
        return this.axios.request({
            method: 'put',
            url: `${this.choosePath(others.type)}/${data.name}`,
            data
        });
    }

    /**
     * Executes a request which if successful will delete the given entity
     *
     * @param {ConfigurationRequest} request - an object which contains all the needed data for this request
     * to be executed.
     *
     * @return {AxiosPromise<AxiosResponse<void>>} promise, which contains nothing
     */
    public delete({
        name = '',
        ...others
    }: ConfigurationRequest): AxiosPromise<AxiosResponse<void>> {
        return this.axios.request({
            method: 'delete',
            url: `${this.choosePath(others.type)}/${name}`
        });
    }

    /**
     * Executes a request which if successful will import the given configuration.
     *
     * NOTE: Importing a configuration overwrites any current configuration you have
     *
     * @param {Configuration} data - configuration object, which is an aggregation of actions,
     * conditions and subscriptions
     *
     * @return {AxiosPromise<Configuration>} promise, which contains the imported configuration
     */
    public import(data: Configuration): AxiosPromise<Configuration> {
        return this.axios.request({
            method: 'post',
            url: this.importPath,
            data
        });
    }

    /**
     * Executes a request which if successful will export the current configuration.
     *
     * @return {AxiosPromise<Configuration>} promise, which contains the exported configuration
     */
    public export(): AxiosPromise<Configuration> {
        return this.axios.request({
            method: 'get',
            url: this.exportPath
        });
    }

    /**
     * Decide which url path to use based on the given entity type
     *
     * @param {EntityType} entityType - type of the configuration entity
     *
     * @return {string} path to the entity
     */
    private choosePath(entityType: EntityType): string {
        switch (entityType) {
            case EntityType.ACTION:
                return this.actionPath;
            case EntityType.CONDITION:
                return this.conditionPath;
            case EntityType.SUBSCRIPTION:
                return this.subscriptionPath;
            default:
                throw new Error('Unknown entity, must be a type from EntityType object');
        }
    }
}
