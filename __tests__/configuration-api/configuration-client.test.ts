import axios from 'axios';
import ConfigurationApiClient from '../../src/configuration-api/configuration-client';

import { Platform } from '../../src/utils/region';
import { EntityType } from '../../src/configuration-api/models';

import * as TestUtils from '../test-utils';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const platform = Platform.CF;
const configurationEntities = [EntityType.ACTION, EntityType.CONDITION, EntityType.SUBSCRIPTION];
const expectedPaths = {
    [EntityType.ACTION]: `/${platform}/configuration/v1/action`,
    [EntityType.CONDITION]: `/${platform}/configuration/v1/condition`,
    [EntityType.SUBSCRIPTION]: `/${platform}/configuration/v1/subscription`
};
const params = {
    page: 0,
    pageSize: 2
};

let classUnderTest: ConfigurationApiClient;

beforeAll(() => {
    classUnderTest = new ConfigurationApiClient(platform, mockedAxios);

    mockedAxios.request.mockImplementation(() => Promise.resolve({}));
});

describe('when getAll is called', () => {

    test('all entities shall be returned and axios shall be called with the expected arguments', () => {
        configurationEntities.forEach((type) => {
            return classUnderTest.getAll({ type, params })
                .then(_entity => {
                    expect(mockedAxios.request).toBeCalledWith({
                        method: 'get',
                        url: expectedPaths[type],
                        params
                    });
                });
        });
    });
});

describe('when getOne is called', () => {

    test('then axios is called with correct arguments', () => {
        configurationEntities.forEach((type) => {
            let name = 'test-name';

            return classUnderTest.getOne({ type, name })
                .then(_entity => {
                    expect(mockedAxios.request).toBeCalledWith({
                        method: 'get',
                        url: `${expectedPaths[type]}/${name}`
                    });
                });
        })
    });
});

describe('when create is called', () => {

    test('then axios is called with correct arguments', () => {
        configurationEntities.forEach((type) => {
            let data = TestUtils.buildAction();

            return classUnderTest.create({ type, data })
                .then(_entity => {
                    expect(mockedAxios.request).toBeCalledWith({
                        method: 'post',
                        url: expectedPaths[type],
                        data
                    });
                });
        })
    });
});

describe('when update is called', () => {

    test('then axios is called with correct arguments', () => {
        configurationEntities.forEach((type) => {
            let name = 'test-action-name';
            let data = TestUtils.buildAction();

            return classUnderTest.update({ type, name, data })
                .then(_entity => {
                    expect(mockedAxios.request).toBeCalledWith({
                        method: 'put',
                        url: `${expectedPaths[type]}/${name}`,
                        data
                    });
                });
        })
    });
});

describe('when delete is called', () => {

    test('then axios is called with correct arguments', () => {
        configurationEntities.forEach((type) => {
            let name = 'test-name';

            return classUnderTest.delete({ type, name })
                .then(_entity => {
                    expect(mockedAxios.request).toBeCalledWith({
                        method: 'delete',
                        url: `${expectedPaths[type]}/${name}`
                    });
                });
        })
    });
});

describe('when import is called', () => {

    test('ten axios is called with correct arguments', () => {
        let configuration = {
            actions: [],
            conditions: [],
            subscriptions: []
        }

        return classUnderTest.import(configuration)
            .then(_entity => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'post',
                    url: `/${platform}/configuration/v1/configuration`,
                    data: configuration
                });
            });
    });
});

describe('when export is called', () => {

    test('then axios is called with correct arguments', () => {
        return classUnderTest.export()
            .then(_entity => {
                expect(mockedAxios.request).toBeCalledWith({
                    method: 'get',
                    url: `/${platform}/configuration/v1/configuration`
                });
            });
    });
});

