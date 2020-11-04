import axios from 'axios';
import EventApiClient from '../../src/producer-api/event-producer-client';
import { Platform } from '../../src/utils/region';
import { Severity, Category } from '../../src/producer-api/models';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const platform = Platform.CF;
const resourceEvent = {
    body: 'test-body',
    eventType: 'test-eventType',
    subject: 'test-subject',
    severity: Severity.INFO,
    category: Category.NOTIFICATION,
    resource: {
        resourceName: 'test-resource-name',
        resourceType: 'test-resource-type'
    }
};
const params = {
    severity: 'test-severity'
};

let classUnderTest: EventApiClient;

beforeAll(() => {
    classUnderTest = new EventApiClient(platform, mockedAxios);

    mockedAxios.request.mockImplementation(() => Promise.resolve({}));
});

describe('when sendEvent is called', () => {

    test('then axios is called with correct arguments', () => {
        return classUnderTest.sendEvent(resourceEvent)
            .then(_event => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'post',
                    url: `${platform}/producer/v1/resource-events`,
                    data: resourceEvent
                });
            });
    });
});

describe('when sendEvents is called', () => {

    test('then axios is called with correct arguments', () => {
        return classUnderTest.sendEvents([ resourceEvent ])
            .then(_event => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'post',
                    url: `${platform}/producer/v1/resource-events-batch`,
                    data: [ resourceEvent ]
                });
            });
    });
});

describe('when getUndeliveredEvents is called', () => {

    test('and eventId is not provided then axios is called with correct arguments', () => {
        return classUnderTest.getUndeliveredEvents({ params })
            .then(_event => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'get',
                    url: `${platform}/consumer/v1/undelivered-events`,
                    params
                });
            });
    });

    test('and eventId is provided then axios is called with correct arguments', () => {
        let eventId = 'test-event-id';
        return classUnderTest.getUndeliveredEvents({ eventId, params })
            .then(_event => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'get',
                    url: `${platform}/consumer/v1/undelivered-events/${eventId}`,
                    params
                });
            });
    });
});

describe('when getMatchedEvents is called', () => {

    test('and eventId is not provided then axios is called with correct arguments', () => {
        return classUnderTest.getMatchedEvents({ params })
            .then(_event => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'get',
                    url: `${platform}/consumer/v1/matched-events`,
                    params
                });
            });
    });

    test('and eventId is provided then axios is called with correct arguments', () => {
        let eventId = 'test-event-id';
        return classUnderTest.getMatchedEvents({ eventId, params })
            .then(_event => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'get',
                    url: `${platform}/consumer/v1/matched-events/${eventId}`,
                    params: params
                });
            });
    });
});