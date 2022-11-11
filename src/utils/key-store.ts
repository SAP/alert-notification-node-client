import * as https from 'https';

export enum KeystoreFormat {
    JKS = 'jks',
    P12 = 'p12',
    PFX = 'pfx',
    PEM = 'pem'
}

// eslint-disable-next-line require-jsdoc
export class KeyStore {
    private format: KeystoreFormat;
    private keyStore: Buffer | undefined;
    private certificate: string | undefined;
    private key: string | undefined;
    private passPhrase: string;
    private httpsAgent: https.Agent;

    // eslint-disable-next-line require-jsdoc
    constructor(
        format: KeystoreFormat,
        passphrase: string,
        keystore?: Buffer,
        certificate?: string,
        key?: string
    ) {
        this.format = format;
        this.keyStore = keystore;
        this.certificate = certificate;
        this.key = key;
        this.passPhrase = passphrase;
        this.httpsAgent = this.buildHttpsAgent();
    }

    // eslint-disable-next-line require-jsdoc
    getFormat(): KeystoreFormat {
        return this.format;
    }

    // eslint-disable-next-line require-jsdoc
    getHttpsAgent(): https.Agent {
        return this.httpsAgent;
    }

    // eslint-disable-next-line require-jsdoc
    private buildHttpsAgent(): https.Agent {
        if (this.getFormat() == KeystoreFormat.JKS || this.getFormat() == KeystoreFormat.PEM) {
            return new https.Agent({
                cert: this.certificate,
                key: this.key,
                passphrase: this.passPhrase
            });
        } else {
            return new https.Agent({
                pfx: this.keyStore,
                passphrase: this.passPhrase
            });
        }
    }
}
