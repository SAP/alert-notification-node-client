# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run a single test file
npx jest __tests__/client.test.ts

# Lint
npm run lint

# Lint with auto-fix
npm run lint:fix

# Build (compile TypeScript to dist/)
npx tsc

# Full pre-publish check (test + lint + build)
npm run prepublishOnly
```

## Architecture

This is a Promise-based Node.js client library for the SAP Alert Notification service for SAP BTP. It is published as `@sap_oss/alert-notification-client`.

**Entry point:** `src/index.ts` — barrel export of all public APIs. Build output goes to `dist/`.

### Public API surface (`src/client.ts`)

`AlertNotificationClient` is the main class consumers instantiate. It delegates to two sub-clients:
- `ConfigurationApiClient` (`src/configuration-api/`) — CRUD for Actions, Conditions, Subscriptions
- `EventsApiClient` (`src/producer-api/`) — sending events and pulling stored/undelivered events

### Authentication (`src/authentication.ts`)

Three strategies implementing a common `Authentication` interface:
- `BasicAuthentication` — static Base64 header
- `OAuthAuthentication` — fetches and caches tokens, handles expiry
- `CertificateAuthentication` — mTLS client certificates (JKS/P12/PFX/PEM via `src/utils/key-store.ts`)

### HTTP layer (`src/utils/axios-utils.ts`)

Axios interceptors are applied in order:
1. Authorization header injection (request)
2. Retry logic (request/response)
3. Response data extraction (response)

### Region mapping (`src/utils/region.ts`)

Maps 26+ SAP BTP region codes (e.g. `EU10`, `US20`) to their CloudFoundry, mTLS, and Mesh endpoint URLs. `RegionUtils` is the public export.

### Destination service integration (`src/utils/destination-configuration.ts`)

Optional: resolves connection details from the SAP Destination Service at runtime instead of hard-coding credentials.

## Testing

Jest with `ts-jest`. Tests live in `__tests__/`, mirroring the `src/` structure. Coverage threshold is 80% across branches, functions, lines, and statements.
