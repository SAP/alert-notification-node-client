/**
 * SAP Alert Notification service for SAP BTP service instance urls
 */
const ANS_AP10_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ap10.hana.ondemand.com';
const ANS_AP11_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ap11.hana.ondemand.com';
const ANS_AP12_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ap12.hana.ondemand.com';
const ANS_AP20_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ap20.hana.ondemand.com';
const ANS_AP21_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ap21.hana.ondemand.com';
const ANS_BR10_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.br10.hana.ondemand.com';
const ANS_EU10_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.eu10.hana.ondemand.com';
const ANS_EU11_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.eu11.hana.ondemand.com';
const ANS_EU20_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.eu20.hana.ondemand.com';
const ANS_US10_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.us10.hana.ondemand.com';
const ANS_US20_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.us20.hana.ondemand.com';
const ANS_US21_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.us21.hana.ondemand.com';
const ANS_CH20_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ch20.hana.ondemand.com';
const ANS_US30_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.us30.hana.ondemand.com';
const ANS_JP10_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.jp10.hana.ondemand.com';
const ANS_JP20_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.jp20.hana.ondemand.com';
const ANS_CA10_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.ca10.hana.ondemand.com';
const ANS_EU30_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.eu30.hana.ondemand.com';
const ANS_IN30_INSTANCE = 'https://clm-sl-ans-live-ans-service-api.cfapps.in30.hana.ondemand.com';

const ANS_AP10_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ap10.hana.ondemand.com';
const ANS_AP11_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ap11.hana.ondemand.com';
const ANS_AP12_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ap12.hana.ondemand.com';
const ANS_AP20_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ap20.hana.ondemand.com';
const ANS_AP21_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ap21.hana.ondemand.com';
const ANS_BR10_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.br10.hana.ondemand.com';
const ANS_EU10_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.eu10.hana.ondemand.com';
const ANS_EU11_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.eu11.hana.ondemand.com';
const ANS_EU20_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.eu20.hana.ondemand.com';
const ANS_US10_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.us10.hana.ondemand.com';
const ANS_US20_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.us20.hana.ondemand.com';
const ANS_US21_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.us21.hana.ondemand.com';
const ANS_CH20_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ch20.hana.ondemand.com';
const ANS_US30_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.us30.hana.ondemand.com';
const ANS_JP10_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.jp10.hana.ondemand.com';
const ANS_JP20_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.jp20.hana.ondemand.com';
const ANS_CA10_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.ca10.hana.ondemand.com';
const ANS_EU30_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.eu30.hana.ondemand.com';
const ANS_IN30_MESH_INSTANCE =
    'https://clm-sl-ans-live-ans-service-api.mesh.cf.in30.hana.ondemand.com';

/**
 * @enum {CF, NEO}
 */
export enum Platform {
    CF = 'cf',
    NEO = 'neo'
}

/**
 * Region
 */
export class Region {
    private platform: Platform;
    private url: string;
    private mTLSUrl: string;

    /**
     * Constructs a Region instance.
     *
     * @param {Platform} platform - platform on which SAP Alert Notification service for SAP BTP resides
     * @param {string} url - base url of SAP Alert Notification service for SAP BTP
     * @param {string} mTLSUrl - mTLS url of SAP Alert Notification service for SAP BTP
     */
    constructor(platform: Platform, url: string, mTLSUrl: string) {
        this.platform = platform;
        this.url = url;
        this.mTLSUrl = mTLSUrl;
    }

    /**
     *
     * Get region's platform
     *
     * @return {Platform}
     */
    getPlatform(): Platform {
        return this.platform;
    }

    /**
     *
     * Get SAP Alert Notification service for SAP BTP's url for the Region
     *
     * @return {string}
     */
    getUrl(): string {
        return this.url;
    }
    /**
     *
     * Get SAP Alert Notification service for SAP BTP's mesh url for the Region
     *
     * @return {string}
     */
    getmTLSUrl(): string {
        return this.mTLSUrl;
    }
}

/**
 * All regions that SAP Alert Notification service for SAP BTP is available on.
 * Below are the aliases of those regions.
 */
export const AE1 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const AP1 = new Region(Platform.NEO, ANS_AP10_INSTANCE, ANS_AP10_MESH_INSTANCE);
export const AP2 = new Region(Platform.NEO, ANS_AP10_INSTANCE, ANS_AP10_MESH_INSTANCE);
export const BR1 = new Region(Platform.NEO, ANS_BR10_INSTANCE, ANS_BR10_MESH_INSTANCE);
export const CA1 = new Region(Platform.NEO, ANS_CA10_INSTANCE, ANS_CA10_MESH_INSTANCE);
export const CA2 = new Region(Platform.NEO, ANS_CA10_INSTANCE, ANS_CA10_MESH_INSTANCE);
export const CN1 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const RU1 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const SA1 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const EU1 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const EU2 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const EU3 = new Region(Platform.NEO, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const US1 = new Region(Platform.NEO, ANS_US10_INSTANCE, ANS_US10_MESH_INSTANCE);
export const US2 = new Region(Platform.NEO, ANS_US10_INSTANCE, ANS_US10_MESH_INSTANCE);
export const US3 = new Region(Platform.NEO, ANS_US10_INSTANCE, ANS_US10_MESH_INSTANCE);
export const US4 = new Region(Platform.NEO, ANS_US10_INSTANCE, ANS_US10_MESH_INSTANCE);
export const JP1 = new Region(Platform.NEO, ANS_JP10_INSTANCE, ANS_JP10_MESH_INSTANCE);
export const EU10 = new Region(Platform.CF, ANS_EU10_INSTANCE, ANS_EU10_MESH_INSTANCE);
export const EU11 = new Region(Platform.CF, ANS_EU11_INSTANCE, ANS_EU11_MESH_INSTANCE);
export const EU20 = new Region(Platform.CF, ANS_EU20_INSTANCE, ANS_EU20_MESH_INSTANCE);
export const AP10 = new Region(Platform.CF, ANS_AP10_INSTANCE, ANS_AP10_MESH_INSTANCE);
export const BR10 = new Region(Platform.CF, ANS_BR10_INSTANCE, ANS_BR10_MESH_INSTANCE);
export const CA10 = new Region(Platform.CF, ANS_CA10_INSTANCE, ANS_CA10_MESH_INSTANCE);
export const AP11 = new Region(Platform.CF, ANS_AP11_INSTANCE, ANS_AP11_MESH_INSTANCE);
export const AP12 = new Region(Platform.CF, ANS_AP12_INSTANCE, ANS_AP12_MESH_INSTANCE);
export const US20 = new Region(Platform.CF, ANS_US20_INSTANCE, ANS_US20_MESH_INSTANCE);
export const US21 = new Region(Platform.CF, ANS_US21_INSTANCE, ANS_US21_MESH_INSTANCE);
export const US30 = new Region(Platform.CF, ANS_US30_INSTANCE, ANS_US30_MESH_INSTANCE);
export const AP20 = new Region(Platform.CF, ANS_AP20_INSTANCE, ANS_AP20_MESH_INSTANCE);
export const AP21 = new Region(Platform.CF, ANS_AP21_INSTANCE, ANS_AP21_MESH_INSTANCE);
export const JP20 = new Region(Platform.CF, ANS_JP20_INSTANCE, ANS_JP20_MESH_INSTANCE);
export const CH20 = new Region(Platform.CF, ANS_CH20_INSTANCE, ANS_CH20_MESH_INSTANCE);
export const US10 = new Region(Platform.CF, ANS_US10_INSTANCE, ANS_US10_MESH_INSTANCE);
export const JP10 = new Region(Platform.CF, ANS_JP10_INSTANCE, ANS_JP10_MESH_INSTANCE);
export const EU30 = new Region(Platform.CF, ANS_EU30_INSTANCE, ANS_EU30_MESH_INSTANCE);
export const IN30 = new Region(Platform.CF, ANS_IN30_INSTANCE, ANS_IN30_MESH_INSTANCE);
/**
 * Customer facing names of the regions.
 */
export const NEO_ROT = AE1;
export const NEO_FRANKFURT = EU2;
export const NEO_AMSTERDAM = EU3;
export const NEO_ASHBURN = US1;
export const NEO_CHANDLER = US2;
export const NEO_STERLING = US3;
export const NEO_COLORADO_SPRINGS = US4;
export const NEO_TOKYO = JP1;
export const NEO_DUBAI = AE1;
export const NEO_SYDNEY = AP1;
export const NEO_SYDNEY_DR = AP2;
export const NEO_SAO_PAULO = BR1;
export const NEO_TORONTO = CA1;
export const NEO_TORONTO_DR = CA2;
export const NEO_RIYADH = SA1;
export const NEO_SHANGHAI = CN1;
export const NEO_MOSCOW = RU1;
export const CF_AWS_SYDNEY = AP10;
export const CF_AWS_SINGAPORE = AP11;
export const CF_AWS_SEOUL = AP12;
export const CF_AWS_SAO_PAULO = BR10;
export const CF_AWS_MONTREAL = CA10;
export const CF_AWS_FRANKFURT = EU10;
export const CF_AWS_FRANKFURT_EU_ACCESS = EU11;
export const CF_AWS_TOKYO = JP10;
export const CF_AWS_US_EAST = US10;
export const CF_AZURE_SINGAPORE = AP21;
export const CF_AZURE_SWITZERLAND = CH20;
export const CF_AZURE_NETHERLANDS = EU20;
export const CF_AZURE_TOKYO = JP20;
export const CF_AZURE_WA = US20;
export const CF_AZURE_VA = US21;
export const CF_AZURE_SYDNEY = AP20;
export const CF_GCP_IA = US30;
export const CF_GCP_FRANKFURT = EU30;
export const CF_GCP_MUMBAI = IN30;
