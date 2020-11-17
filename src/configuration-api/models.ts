import { CommonQueryParams } from '../utils/common';

/**
 * @enum {
 * CONTAINS,DOES_NOT_CONTAIN,
 * STARTS_WITH,
 * DOES_NOT_START_WITH,
 * ENDS_WITH,
 * DOES_NOT_END_WITH,
 * EQUALS,
 * NOT_EQUALS,
 * ANY,
 * NO_VALUE,
 * LESS_THAN,
 * GREATHER_THAN,
 * NUMBER_EQUALS
 * }
 */
export enum Predicate {
    CONTAINS = 'CONTAINS',
    DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
    STARTS_WITH = 'STARTS_WITH',
    DOES_NOT_START_WITH = 'DOES_NOT_START_WITH',
    ENDS_WITH = 'ENDS_WITH',
    DOES_NOT_END_WITH = 'DOES_NOT_END_WITH',
    EQUALS = 'EQUALS',
    NOT_EQUALS = 'NOT_EQUALS',
    ANY = 'ANY',
    NO_VALUE = 'NO_VALUE',
    LESS_THAN = 'LESS_THAN',
    GREATER_THAN = 'GREATER_THAN',
    NUMBER_EQUALS = 'NUMBER_EQUALS'
}

/**
 * @enum {ENABLED, DISABLED}
 */
export enum State {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED'
}

export interface Action {
    /**
     * Action's id which will be generated on its creation.
     */
    id?: string;
    /**
     * Action's type, e.g. STORE, EMAIL, etc.
     */
    type: string;
    /**
     * Unique name of an action, used for its identification.
     */
    name: string;
    /**
     * Identifies the action's current state, that is, if it's currently enabled or disabled.
     */
    state: State;
    /**
     * Brief description of an action, e.g. explaining what it will be used for.
     */
    description?: string;
    /**
     * Representing meaningful identifiers, which enable custom displaying & filtering capabilities.
     */
    labels?: string[];
    /**
     * Action to fallback to if execution of current action fails.
     */
    fallbackAction?: string;
    /**
     * Time in seconds to allow the current action to be retried before executing the fallback action.
     * If 0, undefined or null the action will be retried for its maximum times and if still fails, then
     * the fallback action will be executed.
     */
    fallbackTime?: number;
    /**
     * Action specific key-value pairs describing configuration properties.
     */
    properties?: Record<string, string>;
}

export interface Condition {
    /**
     * Condition's id which will be generated on its creation.
     */
    id?: string;
    /**
     * Unique name of a condition, used for its identification.
     */
    name: string;
    /**
     * Brief description of a condition, e.g. explaining what it will be used for.
     */
    description?: string;
    /**
     * Property key of the event, e.g. eventType.
     */
    propertyKey: string;
    /**
     * Predefined matching criteria.
     */
    predicate: Predicate;
    /**
     * Value to be expected when matching the propertyKey with the given predicate.
     */
    propertyValue?: string;
    /**
     * Representing meaningful identifiers, which enable custom displaying & filtering capabilities.
     */
    labels?: string[];
}

export interface Subscription {
    /**
     * Subscription's id which will be generated on its creation.
     */
    id?: string;
    /**
     * Unique name of a subscription, used for its identification.
     */
    name: string;
    /**
     * Identifies the subscription's current state, that is, if it's currently enabled or disabled.
     */
    state: State;
    /**
     * Unix timestamp format representing disablement of the subscription until the specified date and time.
     */
    snoozeTimestamp?: number;
    /**
     * Brief description of a condition, e.g. explaining what it will be used for.
     */
    description?: string;
    /**
     * Representing meaningful identifiers, which enable custom displaying & filtering capabilities.
     */
    labels?: string[];
    /**
     * Action names that are executed on any matched event.
     */
    actions?: string[];
    /**
     * Condition names that are evaluated for any incoming event
     */
    conditions?: string[];
}

export interface Configuration {
    /**
     * Actions in the configuration.
     */
    actions: Action[];
    /**
     * Conditions in the configuration.
     */
    conditions: Condition[];
    /**
     * Subscriptions in the configuration.
     */
    subscriptions: Subscription[];
}

export interface ConfigurationRequest {
    /**
     * Type of entity.
     */
    type: EntityType;
    /**
     * Entity's unique identifier.
     */
    name?: string;
    /**
     * Data of the requeste entity.
     */
    data?: Action | Condition | Subscription;
    /**
     * Request parameters.
     */
    params?: CommonQueryParams;
}

/**
 * @enum {ACTION, CONDITION, SUBSCRIPTION}
 */
export enum EntityType {
    ACTION = 'ACTION',
    CONDITION = 'CONDITION',
    SUBSCRIPTION = 'SUBSCRIPTION'
}
