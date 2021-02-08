import { Action, State, Condition, Predicate, Subscription, EntityType } from '../src/configuration-api/models';
import { PageResponse } from '../src/utils/common';
import { ResourceEvent, Severity, Category } from '../src/producer-api/models';

export const test_action_id = 'test-action-id';
export const test_condition_id = 'test-condition-id';
export const test_subscription_id = 'test-subscription-id';
export const test_type_store = 'STORE';
export const test_action_name = 'test-action-name';
export const test_condition_name = 'test-condition-name';
export const test_subscription_name = 'test-subscription-name';
export const test_state = State.ENABLED;
export const test_description = 'test-description';
export const test_labels = [];
export const test_fallback_action = '';
export const test_fallback_time = 0;
export const test_discard_after = 10;
export const test_properties = {};
export const test_property_key = 'test-property-key';
export const test_property_value = 'test-property-value';
export const test_predicate = Predicate.ANY;
export const test_snoozeTimestamp = 0;

export interface ExpectedEntityConfiguration<T> {
    entityType: EntityType,
    pageResponse: PageResponse<T>,
    expectedPath: string,
    method: string,
    params: object

}

export function buildAction(action?: Action): Action {
    return {
        id: test_action_id,
        type: test_type_store,
        name: test_action_name,
        state: test_state,
        description: test_description,
        labels: test_labels,
        fallbackAction: test_fallback_action,
        fallbackTime: test_fallback_time,
        discardAfter: test_discard_after,
        properties: test_properties,
        ...{ action }
    };
}

export function buildCondition(condition?: Condition): Condition {
    return {
        id: test_condition_id,
        name: test_condition_name,
        propertyKey: test_property_key,
        description: test_description,
        predicate: test_predicate,
        propertyValue: test_property_value,
        labels: test_labels,
        ...{ condition }
    };
}

export function buildSubscription(subscription?: Subscription): Subscription {
    return {
        id: test_subscription_id,
        name: test_subscription_name,
        state: test_state,
        snoozeTimestamp: test_snoozeTimestamp,
        description: test_description,
        labels: test_labels,
        actions: [test_action_name],
        conditions: [test_condition_name],
        ...{ subscription }
    };
}

export function buildEvent(event?: ResourceEvent): ResourceEvent {
    return {
        body: 'test-body',
        eventType: 'test-body',
        subject: 'test-body',
        severity: Severity.INFO,
        category: Category.NOTIFICATION,
        resource: {
            resourceName: 'test-resource-name',
            resourceType: 'test-resource-type'
        },
        ...{ event }
    }
}