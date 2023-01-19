import AlertNotificationClient, { AlertNotificationConfiguration } from './client';

export {
    DestinationConfiguration,
    CredentialsForDestinationService
} from './utils/destination-configuration';

export {
    Credentials,
    OAuthConfig,
    BasicAuthentication,
    OAuthAuthentication,
    CertificateAuthentication
} from './authentication';

export * as RegionUtils from './utils/region';

export { PageMetadata, PageResponse, CommonQueryParams } from './utils/common';

export {
    State,
    Action,
    Condition,
    Predicate,
    Subscription,
    Configuration,
    EntityType
} from './configuration-api/models';

export {
    Severity,
    Category,
    AffectedResource,
    ResourceEvent,
    ConsumerQueryParameters,
    ConsumerEvent,
    ConsumerPagedResponse
} from './producer-api/models';

export { AlertNotificationClient, AlertNotificationConfiguration };
