import { Region, Platform } from '../../src/utils/region';

describe('when creating region', () => {
    const baseUrl = 'test-url';
    const meshUrl = 'mesh-url';
    let region: Region;

    beforeAll(() => {
        region = new Region(Platform.CF, baseUrl, meshUrl);
    });

    test('getPlatform returns platform', () => {
        expect(region.getPlatform()).toBe(Platform.CF);
    });

    test('getUrl returns the url', () => {
        expect(region.getUrl()).toBe(baseUrl);
    });

    test('getUrl returns the url', () => {
        expect(region.getMeshUrl()).toBe(meshUrl);
    });
});
