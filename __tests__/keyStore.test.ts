import { KeyStore, KeystoreFormat } from '../src/utils/key-store';

const passphrase = 'password';
const keystore = Buffer.from('keystore');
const certificate = 'certificate';
const key = 'key';

describe('Key store', () => {
    test('can be correctly instantiated with Pem keystore', () => {
        const classUnderTest = new KeyStore(
            KeystoreFormat.PEM,
            passphrase,
            undefined,
            certificate,
            key
        );
        expect(classUnderTest).toBeDefined();
        expect(classUnderTest.getHttpsAgent().options.cert).toEqual(certificate);
        expect(classUnderTest.getHttpsAgent().options.key).toEqual(key);
        expect(classUnderTest.getHttpsAgent().options.passphrase).toEqual(passphrase);
        expect(classUnderTest.getHttpsAgent().options.pfx).toBeUndefined();
    });

    test('can be correctly instantiated with JKS keystore', () => {
        const classUnderTest = new KeyStore(
            KeystoreFormat.JKS,
            passphrase,
            undefined,
            certificate,
            key
        );
        expect(classUnderTest).toBeDefined();
        expect(classUnderTest.getHttpsAgent().options.cert).toEqual(certificate);
        expect(classUnderTest.getHttpsAgent().options.key).toEqual(key);
        expect(classUnderTest.getHttpsAgent().options.passphrase).toEqual(passphrase);
        expect(classUnderTest.getHttpsAgent().options.pfx).toBeUndefined();
    });

    test('can be correctly instantiated with PFX keystore', () => {
        const classUnderTest = new KeyStore(
            KeystoreFormat.PFX,
            passphrase,
            keystore,
            undefined,
            undefined
        );
        expect(classUnderTest).toBeDefined();
        expect(classUnderTest.getHttpsAgent().options.pfx).toEqual(keystore);
        expect(classUnderTest.getHttpsAgent().options.passphrase).toEqual(passphrase);
        expect(classUnderTest.getHttpsAgent().options.cert).toBeUndefined();
        expect(classUnderTest.getHttpsAgent().options.key).toBeUndefined();
    });
});
