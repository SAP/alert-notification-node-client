import axios, { AxiosRequestConfig } from 'axios';
import AlertNotificationClient from '../src/client';
import * as RegionUtils from '../src/utils/region';
import {
    configureDefaultRetryInterceptor,
    extractDataOnResponseInterceptor,
    setupAuthorizationHeaderOnRequestInterceptor
} from '../src/utils/axios-utils';
import { EntityType } from '../src/configuration-api/models';
import ConfigurationApiClient from '../src/configuration-api/configuration-client';

import { buildAction, buildEvent } from './test-utils';
import EventsApiClient from '../src/producer-api/event-producer-client';
import { CertificateAuthentication } from '../src/authentication';

jest.mock('axios');
jest.mock('../src/configuration-api/configuration-client');
jest.mock('../src/producer-api/event-producer-client');
jest.mock('../src/utils/axios-utils');

const mockedAuthentication = {
    getAuthorizationHeaderValue: jest.fn(() => Promise.resolve('test-authorization-value'))
};
const region = RegionUtils.EU10;

beforeEach(() => {
    axios.create = jest.fn((_config: AxiosRequestConfig) => axios);
});

describe('when instantiating alert notification client', () => {
    describe('and retryConfig is provided', () => {
        test('and both maxRetries and retryBackoff are provided', () => {
            expect(
                () =>
                    new AlertNotificationClient({
                        authentication: mockedAuthentication,
                        region: region,
                        retryConfig: {
                            maxRetries: 5,
                            retryBackoff: 1000
                        }
                    })
            ).toBeDefined();
        });

        test('then retry interceptor is set', () => {
            new AlertNotificationClient({
                authentication: mockedAuthentication,
                region: region,
                retryConfig: {
                    maxRetries: 5,
                    retryBackoff: 1000
                }
            });

            expect(configureDefaultRetryInterceptor).toBeCalledTimes(1);
            expect(configureDefaultRetryInterceptor).toBeCalledWith(axios);
        });
    });

    test('authentication_with_certificate_service_is_provided', () => {
        expect(
            () =>
                new AlertNotificationClient({
                    authentication: new CertificateAuthentication({
                        certificate: 'certificate',
                        privateKey: 'key'
                    }),
                    region: region
                })
        ).toBeDefined();
    });

    test('authorization header interceptor is set', () => {
        new AlertNotificationClient({
            authentication: mockedAuthentication,
            region: region,
            retryConfig: {
                maxRetries: 5,
                retryBackoff: 1000
            }
        });

        expect(setupAuthorizationHeaderOnRequestInterceptor).toBeCalledTimes(1);
        expect(setupAuthorizationHeaderOnRequestInterceptor).toBeCalledWith(
            axios,
            mockedAuthentication
        );
    });

    test('response data extractor interceptor is set', () => {
        new AlertNotificationClient({
            authentication: mockedAuthentication,
            region: region,
            retryConfig: {
                maxRetries: 5,
                retryBackoff: 1000
            }
        });

        expect(extractDataOnResponseInterceptor).toBeCalledTimes(1);
        expect(extractDataOnResponseInterceptor).toBeCalledWith(axios);
    });

    test('setupAuthorizationHeader is not called when authentication is with Certificate service', () => {
        const axiosRequestConfig = new CertificateAuthentication({
            certificate: 'certificate',
            privateKey: 'key'
        });
        new AlertNotificationClient({
            authentication: axiosRequestConfig,
            region: region,
            retryConfig: {
                maxRetries: 5,
                retryBackoff: 1000
            }
        });

        expect(setupAuthorizationHeaderOnRequestInterceptor).toBeCalledTimes(0);
    });
});

describe('alert configuration client methods', () => {
    let classUnderTest: AlertNotificationClient;

    beforeEach(() => {
        classUnderTest = new AlertNotificationClient({
            authentication: mockedAuthentication,
            region: region
        });
    });

    test('get calls configurationClient.getOne', () => {
        classUnderTest.get(EntityType.ACTION, 'entity');
        expect(ConfigurationApiClient.prototype.getOne).toBeCalledTimes(1);
    });

    test('getAll calls configurationClient.getAll', () => {
        classUnderTest.getAll(EntityType.ACTION);
        expect(ConfigurationApiClient.prototype.getAll).toBeCalledTimes(1);
    });

    test('update calls configurationClient.update', () => {
        classUnderTest.update(EntityType.ACTION, buildAction());
        expect(ConfigurationApiClient.prototype.update).toBeCalledTimes(1);
    });

    test('create calls configurationClient.create', () => {
        classUnderTest.create(EntityType.ACTION, buildAction());
        expect(ConfigurationApiClient.prototype.create).toBeCalledTimes(1);
    });

    test('delete calls configurationClient.delete', () => {
        classUnderTest.delete(EntityType.ACTION, 'entity');
        expect(ConfigurationApiClient.prototype.delete).toBeCalledTimes(1);
    });

    test('importConfiguration calls configurationClient.import', () => {
        classUnderTest.importConfiguration({ actions: [], conditions: [], subscriptions: [] });
        expect(ConfigurationApiClient.prototype.import).toBeCalledTimes(1);
    });

    test('exportConfiguration calls configurationClient.export', () => {
        classUnderTest.exportConfiguration();
        expect(ConfigurationApiClient.prototype.export).toBeCalledTimes(1);
    });

    test('sendEvent calls configurationClient.sendEvent', () => {
        classUnderTest.sendEvent(buildEvent());
        expect(EventsApiClient.prototype.sendEvent).toBeCalledTimes(1);
    });

    test('sendEvents calls configurationClient.sendEvents', () => {
        classUnderTest.sendEvents([buildEvent()]);
        expect(EventsApiClient.prototype.sendEvents).toBeCalledTimes(1);
    });

    test('getMatchedEvent calls configurationClient.getMatchedEvents', () => {
        classUnderTest.getMatchedEvent('eventId');
        expect(EventsApiClient.prototype.getMatchedEvents).toBeCalledTimes(1);
    });

    test('getMatchedEvents calls configurationClient.getOne', () => {
        classUnderTest.getMatchedEvents();
        expect(EventsApiClient.prototype.getMatchedEvents).toBeCalledTimes(1);
    });

    test('getUndeliveredEvent calls configurationClient.getUndeliveredEvents', () => {
        classUnderTest.getUndeliveredEvent('eventId');
        expect(EventsApiClient.prototype.getUndeliveredEvents).toBeCalledTimes(1);
    });

    test('getUndeliveredEvents calls configurationClient.getUndeliveredEvents', () => {
        classUnderTest.getUndeliveredEvents();
        expect(EventsApiClient.prototype.getUndeliveredEvents).toBeCalledTimes(1);
    });
});
