# Orbit PHP SDK



The PHP SDK for the Orbit API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Activity()` — with named operations (`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/orbit-sdk/releases](https://github.com/voxgig-sdk/orbit-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'orbit_sdk.php';

$client = new OrbitSDK([
    "apikey" => getenv("ORBIT_APIKEY"),
]);
```

### 3. Load an activity

Activity is nested under workspace_slug, so provide the `workspace_slug`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Activity record (throws on error).
    $activity = $client->Activity()->load(["workspace_slug" => "example_workspace_slug"]);
    print_r($activity->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Activity record.
$created = $client->Activity()->create(["workspace_slug" => "example_workspace_slug", "identity" => [], "title" => "example_title"]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Activity()->update(["id" => $created->data_get()["id"], "member_id" => "example_member_id", "workspace_slug" => "example_workspace_slug"]);

// Remove
$client->Activity()->remove(["id" => $created->data_get()["id"], "member_id" => "example_member_id", "workspace_slug" => "example_workspace_slug"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $note = $client->Note()->load(["member_slug" => "example", "workspace_slug" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = OrbitSDK::test([
    "entity" => ["webhook" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$webhook = $client->Webhook()->load(["id" => "test01", "workspace_slug" => "example"]);
print_r($webhook->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OrbitSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ORBIT_TEST_LIVE=TRUE
ORBIT_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OrbitSDK

```php
require_once 'orbit_sdk.php';
$client = new OrbitSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OrbitSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OrbitSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Activity` | `($data): ActivityEntity` | Create an Activity entity instance. |
| `ActivityType` | `($data): ActivityTypeEntity` | Create an ActivityType entity instance. |
| `Member` | `($data): MemberEntity` | Create a Member entity instance. |
| `Note` | `($data): NoteEntity` | Create a Note entity instance. |
| `Organization` | `($data): OrganizationEntity` | Create an Organization entity instance. |
| `Report` | `($data): ReportEntity` | Create a Report entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |
| `Webhook` | `($data): WebhookEntity` | Create a Webhook entity instance. |
| `Workspace` | `($data): WorkspaceEntity` | Create a Workspace entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Activity

| Field | Description |
| --- | --- |
| `activity` |  |
| `activity_type` | The type of activity - what action was done by the member. |
| `activity_type_key` | The key for a custom activity type for the workspace. |
| `data` |  |
| `description` | A description of the activity; displayed in the timeline |
| `id` |  |
| `identity` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` |  |
| `key` | Supply a key that must be unique or leave blank to have one generated. |
| `link` | A URL for the activity; displayed in the timeline |
| `link_text` | The text for the timeline link |
| `links` |  |
| `occurred_at` | The date and time the activity occurred; defaults to now |
| `properties` | Key-value pairs to provide contextual metadata about an activity. |
| `title` | A title for the activity; displayed in the timeline |
| `weight` | A custom weight to be used in filters and reports; defaults to 1. |

Operations: Create, Load, Remove, Update.

API path: `/{workspace_slug}/members/{member_slug}/activities`

#### ActivityType

| Field | Description |
| --- | --- |
| `data` |  |
| `links` |  |

Operations: Load.

API path: `/{workspace_slug}/activity_types`

#### Member

| Field | Description |
| --- | --- |
| `bio` |  |
| `birthday` |  |
| `company` |  |
| `data` |  |
| `devto` | The member's DEV username |
| `email` | The member's email |
| `github` | The member's GitHub username |
| `id` |  |
| `identity` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` |  |
| `linkedin` | The member's LinkedIn username, without the in/ or pub/ |
| `links` |  |
| `location` |  |
| `member` |  |
| `name` |  |
| `pronouns` |  |
| `shipping_address` |  |
| `slug` |  |
| `tag_list` | Deprecated: Please use the tags attribute instead |
| `tags` | Replaces all tags for the member; comma-separated string or array |
| `tags_to_add` | Adds tags to member; comma-separated string or array |
| `teammate` |  |
| `title` |  |
| `tshirt` |  |
| `twitter` | The member's Twitter username |
| `url` |  |

Operations: Create, Load, Remove, Update.

API path: `/{workspace_slug}/members/{member_slug}/identities`

#### Note

| Field | Description |
| --- | --- |
| `body` |  |
| `data` |  |
| `id` |  |
| `included` |  |
| `links` |  |

Operations: Create, Load, Update.

API path: `/{workspace_slug}/members/{member_slug}/notes`

#### Organization

| Field | Description |
| --- | --- |
| `crm_uid` | The unique identifier of the organization in your CRM. |
| `crm_url` | A link to the organization profile in your CRM. |
| `data` |  |
| `deal_closed_date` | The date the organization became a customer. |
| `id` |  |
| `lifecycle_stage` | The current stage of the organization in the marketing or sales process. |
| `links` |  |
| `owner_email` | The email of the team member who is in charge of the organization. |
| `owner_name` | The name of the team member who is in charge of the organization. |
| `price_plan` | The pricing plan the organization is on. |
| `source` | The name of the CRM you use for tracking the organization. |

Operations: Load, Update.

API path: `/{workspace_slug}/organizations`

#### Report

| Field | Description |
| --- | --- |
| `data` |  |

Operations: Load.

API path: `/{workspace_slug}/reports`

#### User

| Field | Description |
| --- | --- |
| `data` |  |

Operations: Load.

API path: `/user`

#### Webhook

| Field | Description |
| --- | --- |
| `activity_tags` |  |
| `activity_types` |  |
| `data` |  |
| `event_type` |  |
| `id` |  |
| `links` |  |
| `member_tags` |  |
| `name` |  |
| `secret` |  |
| `url` |  |

Operations: Create, Load, Remove, Update.

API path: `/{workspace_slug}/webhooks`

#### Workspace

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `included` |  |

Operations: Load.

API path: `/workspaces/{workspace_slug}`



## Entities


### Activity

Create an instance: `$activity = $client->Activity();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `mixed` |  |
| `activity_type` | `string` | The type of activity - what action was done by the member. |
| `activity_type_key` | `string` | The key for a custom activity type for the workspace. |
| `data` | `array` |  |
| `description` | `string` | A description of the activity; displayed in the timeline |
| `id` | `string` |  |
| `identity` | `array` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `array` |  |
| `key` | `string` | Supply a key that must be unique or leave blank to have one generated. |
| `link` | `string` | A URL for the activity; displayed in the timeline |
| `link_text` | `string` | The text for the timeline link |
| `links` | `array` |  |
| `occurred_at` | `string` | The date and time the activity occurred; defaults to now |
| `properties` | `array` | Key-value pairs to provide contextual metadata about an activity. |
| `title` | `string` | A title for the activity; displayed in the timeline |
| `weight` | `string` | A custom weight to be used in filters and reports; defaults to 1. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Activity record (throws on error).
$activity = $client->Activity()->load(["id" => "activity_id", "workspace_slug" => "workspace_slug"]);
```

#### Example: Create

```php
$activity = $client->Activity()->create([
    "workspace_slug" => null, // string
    "identity" => null, // array
    "title" => null, // string
]);
```


### ActivityType

Create an instance: `$activity_type = $client->ActivityType();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `links` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ActivityType record (throws on error).
$activity_type = $client->ActivityType()->load(["workspace_slug" => "workspace_slug"]);
```


### Member

Create an instance: `$member = $client->Member();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `string` |  |
| `birthday` | `string` |  |
| `company` | `string` |  |
| `data` | `array` |  |
| `devto` | `string` | The member's DEV username |
| `email` | `string` | The member's email |
| `github` | `string` | The member's GitHub username |
| `id` | `string` |  |
| `identity` | `array` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `array` |  |
| `linkedin` | `string` | The member's LinkedIn username, without the in/ or pub/ |
| `links` | `array` |  |
| `location` | `string` |  |
| `member` | `array` |  |
| `name` | `string` |  |
| `pronouns` | `string` |  |
| `shipping_address` | `string` |  |
| `slug` | `string` |  |
| `tag_list` | `string` | Deprecated: Please use the tags attribute instead |
| `tags` | `string` | Replaces all tags for the member; comma-separated string or array |
| `tags_to_add` | `string` | Adds tags to member; comma-separated string or array |
| `teammate` | `bool` |  |
| `title` | `string` |  |
| `tshirt` | `string` |  |
| `twitter` | `string` | The member's Twitter username |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Member record (throws on error).
$member = $client->Member()->load(["id" => "member_id", "workspace_slug" => "workspace_slug"]);
```

#### Example: Create

```php
$member = $client->Member()->create([
    "workspace_slug" => null, // string
    "identity" => null, // array
]);
```


### Note

Create an instance: `$note = $client->Note();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `data` | `array` |  |
| `id` | `string` |  |
| `included` | `array` |  |
| `links` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Note record (throws on error).
$note = $client->Note()->load(["member_slug" => "member_slug", "workspace_slug" => "workspace_slug"]);
```

#### Example: Create

```php
$note = $client->Note()->create([
    "member_slug" => null, // string
    "workspace_slug" => null, // string
    "body" => null, // string
]);
```


### Organization

Create an instance: `$organization = $client->Organization();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crm_uid` | `string` | The unique identifier of the organization in your CRM. |
| `crm_url` | `string` | A link to the organization profile in your CRM. |
| `data` | `array` |  |
| `deal_closed_date` | `string` | The date the organization became a customer. |
| `id` | `string` |  |
| `lifecycle_stage` | `string` | The current stage of the organization in the marketing or sales process. |
| `links` | `array` |  |
| `owner_email` | `string` | The email of the team member who is in charge of the organization. |
| `owner_name` | `string` | The name of the team member who is in charge of the organization. |
| `price_plan` | `string` | The pricing plan the organization is on. |
| `source` | `string` | The name of the CRM you use for tracking the organization. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Organization record (throws on error).
$organization = $client->Organization()->load(["id" => "organization_id", "workspace_slug" => "workspace_slug"]);
```


### Report

Create an instance: `$report = $client->Report();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Report record (throws on error).
$report = $client->Report()->load(["workspace_slug" => "workspace_slug"]);
```


### User

Create an instance: `$user = $client->User();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
$user = $client->User()->load();
```


### Webhook

Create an instance: `$webhook = $client->Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity_tags` | `array` |  |
| `activity_types` | `array` |  |
| `data` | `array` |  |
| `event_type` | `string` |  |
| `id` | `string` |  |
| `links` | `array` |  |
| `member_tags` | `array` |  |
| `name` | `string` |  |
| `secret` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Webhook record (throws on error).
$webhook = $client->Webhook()->load(["id" => "webhook_id", "workspace_slug" => "workspace_slug"]);
```

#### Example: Create

```php
$webhook = $client->Webhook()->create([
    "workspace_slug" => null, // string
    "event_type" => null, // string
    "name" => null, // string
    "url" => null, // string
]);
```


### Workspace

Create an instance: `$workspace = $client->Workspace();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `id` | `string` |  |
| `included` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Workspace record (throws on error).
$workspace = $client->Workspace()->load(["id" => "workspace_id"]);
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── orbit_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`orbit_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$note = $client->Note();
$note->load(["member_slug" => "example", "workspace_slug" => "example"]);

// $note->data_get() now returns the note data from the last load
// $note->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
