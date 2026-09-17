# Orbit API

Please see the complete Orbit API documentation at [https://api.orbit.love/](https://api.orbit.love/).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 33 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Activity](docs/api/activity.html)

Results: success; activity deleted; activity updated.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `activity_type`: The type of activity - what action was done by the member.
- `activity_type_key`: The key for a custom activity type for the workspace.
- `description`: A description of the activity; displayed in the timeline
- `identity`: Represents an email address, a profile on networks like github and twitter, or a record in another system.
- `key`: Supply a key that must be unique or leave blank to have one generated.

### [ActivityType](docs/api/activity_type.html)

Results: success.

SDK operations: `load`.

### [Member](docs/api/member.html)

Results: success; created; member deleted; identity deleted; member updated.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `devto`: The member&#39;s DEV username
- `email`: The member&#39;s email
- `github`: The member&#39;s GitHub username
- `identity`: Represents an email address, a profile on networks like github and twitter, or a record in another system.
- `linkedin`: The member&#39;s LinkedIn username, without the in/ or pub/

### [Note](docs/api/note.html)

Results: note created; success; note updated.

SDK operations: `create`, `load`, `update`.

### [Organization](docs/api/organization.html)

Results: success; organization updated.

SDK operations: `load`, `update`.

Key fields to recognise:

- `crm_uid`: The unique identifier of the organization in your CRM.
- `crm_url`: A link to the organization profile in your CRM.
- `deal_closed_date`: The date the organization became a customer.
- `lifecycle_stage`: The current stage of the organization in the marketing or sales process.
- `owner_email`: The email of the team member who is in charge of the organization.

### [Report](docs/api/report.html)

Results: success.

SDK operations: `load`.

### [User](docs/api/user.html)

Results: success.

SDK operations: `load`.

### [Webhook](docs/api/webhook.html)

Results: webhook created; success; webhook deleted; webhook updated.

SDK operations: `create`, `load`, `remove`, `update`.

### [Workspace](docs/api/workspace.html)

Results: success.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Activity](docs/api/activity.html) | `create` | `POST /{workspace_slug}/members/{member_slug}/activities` | Required |
| [Activity](docs/api/activity.html) | `create` | `POST /{workspace_slug}/activities` | Required |
| [Activity](docs/api/activity.html) | `load` | `GET /{workspace_slug}/activities` | Required |
| [Activity](docs/api/activity.html) | `load` | `GET /{workspace_slug}/members/{member_slug}/activities` | Required |
| [Activity](docs/api/activity.html) | `load` | `GET /{workspace_slug}/organizations/{organization_id}/activities` | Required |
| [Activity](docs/api/activity.html) | `load` | `GET /{workspace_slug}/activities/{id}` | Required |
| [Activity](docs/api/activity.html) | `remove` | `DELETE /{workspace_slug}/members/{member_slug}/activities/{id}` | Required |
| [Activity](docs/api/activity.html) | `update` | `PUT /{workspace_slug}/members/{member_slug}/activities/{id}` | Required |
| [ActivityType](docs/api/activity_type.html) | `load` | `GET /{workspace_slug}/activity_types` | Required |
| [Member](docs/api/member.html) | `create` | `POST /{workspace_slug}/members/{member_slug}/identities` | Required |
| [Member](docs/api/member.html) | `create` | `POST /{workspace_slug}/members` | Required |
| [Member](docs/api/member.html) | `load` | `GET /{workspace_slug}/members` | Required |
| [Member](docs/api/member.html) | `load` | `GET /{workspace_slug}/members/find` | Required |
| [Member](docs/api/member.html) | `load` | `GET /{workspace_slug}/organizations/{organization_id}/members` | Required |
| [Member](docs/api/member.html) | `load` | `GET /{workspace_slug}/members/{member_slug}` | Required |
| [Member](docs/api/member.html) | `remove` | `DELETE /{workspace_slug}/members/{member_slug}` | Required |
| [Member](docs/api/member.html) | `remove` | `DELETE /{workspace_slug}/members/{member_slug}/identities` | Required |
| [Member](docs/api/member.html) | `update` | `PUT /{workspace_slug}/members/{member_slug}` | Required |
| [Note](docs/api/note.html) | `create` | `POST /{workspace_slug}/members/{member_slug}/notes` | Required |
| [Note](docs/api/note.html) | `load` | `GET /{workspace_slug}/members/{member_slug}/notes` | Required |
| [Note](docs/api/note.html) | `update` | `PUT /{workspace_slug}/members/{member_slug}/notes/{id}` | Required |
| [Organization](docs/api/organization.html) | `load` | `GET /{workspace_slug}/organizations` | Required |
| [Organization](docs/api/organization.html) | `load` | `GET /{workspace_slug}/organizations/{organization_id}` | Required |
| [Organization](docs/api/organization.html) | `update` | `PUT /{workspace_slug}/organizations/{organization_id}` | Required |
| [Report](docs/api/report.html) | `load` | `GET /{workspace_slug}/reports` | Required |
| [User](docs/api/user.html) | `load` | `GET /user` | Required |
| [Webhook](docs/api/webhook.html) | `create` | `POST /{workspace_slug}/webhooks` | Required |
| [Webhook](docs/api/webhook.html) | `load` | `GET /{workspace_slug}/webhooks/{id}` | Required |
| [Webhook](docs/api/webhook.html) | `load` | `GET /{workspace_slug}/webhooks` | Required |
| [Webhook](docs/api/webhook.html) | `remove` | `DELETE /{workspace_slug}/webhooks/{id}` | Required |
| [Webhook](docs/api/webhook.html) | `update` | `PUT /{workspace_slug}/webhooks/{id}` | Required |
| [Workspace](docs/api/workspace.html) | `load` | `GET /workspaces/{workspace_slug}` | Required |
| [Workspace](docs/api/workspace.html) | `load` | `GET /workspaces` | Required |

## Connect to the API

- API server: `https://app.orbit.love/api/v1`

The default credential is sent in the `api_key` query.

Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.

Provide a Authorization header with format &#39;Bearer &lt;api_key&gt;&#39;. This is the recommended approach. Make sure to include the &#39;Bearer&#39; part in the text box here.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `orbit_list`: List records for an entity. No active entity supports this operation.
- `orbit_load`: Load one record for an entity. Supported entities: `activity`, `activity_type`, `member`, `note`, `organization`, `report`, `user`, `webhook`, `workspace`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

