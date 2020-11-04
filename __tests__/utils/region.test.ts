import { Region, Platform } from "../../src/utils/region";

describe('when creating region', () => {
    const testUrl = 'test-url';
    let region: Region;

    beforeAll(() => {
        region = new Region(Platform.CF, testUrl);
    });

    test('getPlatform returns platform', () => {
        expect(region.getPlatform()).toBe(Platform.CF);
    });

    test('getUrl returns the url', () => {
        expect(region.getUrl()).toBe(testUrl);
    });
});