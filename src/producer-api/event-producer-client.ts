import { AxiosInstance, AxiosPromise } from 'axios';

import { ResourceEvent, ConsumerRequest, ConsumerPagedResponse } from './models';

/**
 * Class used to access SAP Cloud Platform Alert Notification Producer API.
 *
 */
export default class EventsApiClient {
    private axios: AxiosInstance;
    private resourceEventsPath: string;
    private resourceEventsBatchPath: string;
    private matchedEventsPath: string;
    private undeliveredEventsPath: string;

    /**
     * Constructs an instance of EventsApiClient, which is used for  making
     * requests to SAP Cloud Platform Alert Notification Proucer API.
     *
     *
     * @param {string} platform - platform, which can be CloudFoundry or Neo,
     * used to decide which endpoints to call
     * @param {AxiosInstance} axios - http client used for making http requests
     */
    constructor(platform: string, axios: AxiosInstance) {
        this.axios = axios;
        this.resourceEventsBatchPath = `${platform}/producer/v1/resource-events-batch`;
        this.resourceEventsPath = `${platform}/producer/v1/resource-events`;
        this.matchedEventsPath = `${platform}/consumer/v1/matched-events`;
        this.undeliveredEventsPath = `${platform}/consumer/v1/undelivered-events`;
    }

    /**
     * Executes a request which if successful will ingest a resource event into
     * SAP Cloud Platform Alert Notification and the system will start processing it.
     *
     * @param {ResourceEvent} event - resource event to be ingested into SAP Cloud Platform Alert Notification
     *
     * @return {AxiosPromise<ResourceEvent>} promise, which contains the successfully ingested event
     */
    public sendEvent(event: ResourceEvent): AxiosPromise<ResourceEvent> {
        return this.axios.request({
            method: 'post',
            url: this.resourceEventsPath,
            data: event
        });
    }

    /**
     * Executes a request of ingesting multiple resource events into SAP Cloud Platform Alert Notification.
     * If an error occurs and one of them cannot be ingested, the ingestion will be discontinued
     * and an error will be returned. The error response will contain the accepted and rejected events.
     *
     * @param {ResourceEvent[]} events - resource events to be ingested into Alert Notifcation, note that
     * they will be processed in order starting from index 0
     *
     * @return {AxiosPromise<ResourceEvent[]>} promise, which contains the successfully ingested events
     */
    public sendEvents(events: ResourceEvent[]): AxiosPromise<ResourceEvent[]> {
        return this.axios.request({
            method: 'post',
            url: this.resourceEventsBatchPath,
            data: events
        });
    }

    /**
     * Executes a request for finding undelivered events
     *
     * @param {ConsumerRequest} consumerRequest - parameters which will be used to search an undelivered
     * event
     *
     * @return {AxiosPromise<ConsumerPagedResponse>} promise, which contains undelivered events if any
     */
    public getUndeliveredEvents(
        consumerRequest: ConsumerRequest
    ): AxiosPromise<ConsumerPagedResponse> {
        return this.axios.request({
            method: 'get',
            url: consumerRequest.eventId
                ? `${this.undeliveredEventsPath}/${consumerRequest.eventId}`
                : this.undeliveredEventsPath,
            params: consumerRequest.params
        });
    }

    /**
     * Executes a request for finding matched events
     *
     * @param {ConsumerRequest} consumerRequest - parameters which will be used to search a matched
     * event
     *
     * @return {AxiosPromise<ConsumerPagedResponse>} promise, which contains matched events if any
     */
    public getMatchedEvents(consumerRequest: ConsumerRequest): AxiosPromise<ConsumerPagedResponse> {
        return this.axios.request({
            method: 'get',
            url: consumerRequest.eventId
                ? `${this.matchedEventsPath}/${consumerRequest.eventId}`
                : this.matchedEventsPath,
            params: consumerRequest.params
        });
    }
}
