# Orbit Python SDK



The Python SDK for the Orbit API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Activity()` — each
carrying a small, uniform set of operations (`load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/orbit-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from orbit_sdk import OrbitSDK

client = OrbitSDK({
    "apikey": os.environ.get("ORBIT_APIKEY"),
})
```

### 3. Load an activity

Activity is nested under workspace_slug, so provide the `workspace_slug`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    activity = client.Activity().load({"workspace_slug": "example_workspace_slug"})
    print(activity)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Activity().create({"workspace_slug": "example_workspace_slug", "identity": {}, "title": "example_title"})

# Update — the created record's id is a plain dict key
client.Activity().update({"id": created.data_get()["id"], "member_id": "example_member_id", "workspace_slug": "example_workspace_slug"})

# Remove
client.Activity().remove({"id": created.data_get()["id"], "member_id": "example_member_id", "workspace_slug": "example_workspace_slug"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    note = client.Note().load({"member_slug": "example", "workspace_slug": "example"})
    print(note)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = OrbitSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
note = client.Note().load({"member_slug": "example", "workspace_slug": "example"})
# note contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = OrbitSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ORBIT_TEST_LIVE=TRUE
ORBIT_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### OrbitSDK

```python
from orbit_sdk import OrbitSDK

client = OrbitSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = OrbitSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### OrbitSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Activity` | `(data) -> ActivityEntity` | Create an Activity entity instance. |
| `ActivityType` | `(data) -> ActivityTypeEntity` | Create an ActivityType entity instance. |
| `Member` | `(data) -> MemberEntity` | Create a Member entity instance. |
| `Note` | `(data) -> NoteEntity` | Create a Note entity instance. |
| `Organization` | `(data) -> OrganizationEntity` | Create an Organization entity instance. |
| `Report` | `(data) -> ReportEntity` | Create a Report entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |
| `Workspace` | `(data) -> WorkspaceEntity` | Create a Workspace entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `activity = client.Activity()`

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
| `activity` | `Any` |  |
| `activity_type` | `str` | The type of activity - what action was done by the member. |
| `activity_type_key` | `str` | The key for a custom activity type for the workspace. |
| `data` | `list` |  |
| `description` | `str` | A description of the activity; displayed in the timeline |
| `id` | `str` |  |
| `identity` | `dict` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `list` |  |
| `key` | `str` | Supply a key that must be unique or leave blank to have one generated. |
| `link` | `str` | A URL for the activity; displayed in the timeline |
| `link_text` | `str` | The text for the timeline link |
| `links` | `dict` |  |
| `occurred_at` | `str` | The date and time the activity occurred; defaults to now |
| `properties` | `dict` | Key-value pairs to provide contextual metadata about an activity. |
| `title` | `str` | A title for the activity; displayed in the timeline |
| `weight` | `str` | A custom weight to be used in filters and reports; defaults to 1. |

#### Example: Load

```python
activity = client.Activity().load({"id": "activity_id", "workspace_slug": "workspace_slug"})
```

#### Example: Create

```python
activity = client.Activity().create({
    "workspace_slug": "example_workspace_slug",  # str
    "identity": {},  # dict
    "title": "example_title",  # str
})
```


### ActivityType

Create an instance: `activity_type = client.ActivityType()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `links` | `dict` |  |

#### Example: Load

```python
activity_type = client.ActivityType().load({"workspace_slug": "workspace_slug"})
```


### Member

Create an instance: `member = client.Member()`

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
| `bio` | `str` |  |
| `birthday` | `str` |  |
| `company` | `str` |  |
| `data` | `list` |  |
| `devto` | `str` | The member's DEV username |
| `email` | `str` | The member's email |
| `github` | `str` | The member's GitHub username |
| `id` | `str` |  |
| `identity` | `dict` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `list` |  |
| `linkedin` | `str` | The member's LinkedIn username, without the in/ or pub/ |
| `links` | `dict` |  |
| `location` | `str` |  |
| `member` | `dict` |  |
| `name` | `str` |  |
| `pronouns` | `str` |  |
| `shipping_address` | `str` |  |
| `slug` | `str` |  |
| `tag_list` | `str` | Deprecated: Please use the tags attribute instead |
| `tags` | `str` | Replaces all tags for the member; comma-separated string or array |
| `tags_to_add` | `str` | Adds tags to member; comma-separated string or array |
| `teammate` | `bool` |  |
| `title` | `str` |  |
| `tshirt` | `str` |  |
| `twitter` | `str` | The member's Twitter username |
| `url` | `str` |  |

#### Example: Load

```python
member = client.Member().load({"id": "member_id", "workspace_slug": "workspace_slug"})
```

#### Example: Create

```python
member = client.Member().create({
    "workspace_slug": "example_workspace_slug",  # str
    "identity": {},  # dict
})
```


### Note

Create an instance: `note = client.Note()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `str` |  |
| `data` | `list` |  |
| `id` | `str` |  |
| `included` | `list` |  |
| `links` | `dict` |  |

#### Example: Load

```python
note = client.Note().load({"member_slug": "member_slug", "workspace_slug": "workspace_slug"})
```

#### Example: Create

```python
note = client.Note().create({
    "member_slug": "example_member_slug",  # str
    "workspace_slug": "example_workspace_slug",  # str
    "body": "example_body",  # str
})
```


### Organization

Create an instance: `organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crm_uid` | `str` | The unique identifier of the organization in your CRM. |
| `crm_url` | `str` | A link to the organization profile in your CRM. |
| `data` | `list` |  |
| `deal_closed_date` | `str` | The date the organization became a customer. |
| `id` | `str` |  |
| `lifecycle_stage` | `str` | The current stage of the organization in the marketing or sales process. |
| `links` | `dict` |  |
| `owner_email` | `str` | The email of the team member who is in charge of the organization. |
| `owner_name` | `str` | The name of the team member who is in charge of the organization. |
| `price_plan` | `str` | The pricing plan the organization is on. |
| `source` | `str` | The name of the CRM you use for tracking the organization. |

#### Example: Load

```python
organization = client.Organization().load({"id": "organization_id", "workspace_slug": "workspace_slug"})
```


### Report

Create an instance: `report = client.Report()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |

#### Example: Load

```python
report = client.Report().load({"workspace_slug": "workspace_slug"})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |

#### Example: Load

```python
user = client.User().load()
```


### Webhook

Create an instance: `webhook = client.Webhook()`

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
| `activity_tags` | `list` |  |
| `activity_types` | `list` |  |
| `data` | `dict` |  |
| `event_type` | `str` |  |
| `id` | `str` |  |
| `links` | `dict` |  |
| `member_tags` | `list` |  |
| `name` | `str` |  |
| `secret` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
webhook = client.Webhook().load({"id": "webhook_id", "workspace_slug": "workspace_slug"})
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "workspace_slug": "example_workspace_slug",  # str
    "event_type": "example_event_type",  # str
    "name": "example_name",  # str
    "url": "example_url",  # str
})
```


### Workspace

Create an instance: `workspace = client.Workspace()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `dict` |  |
| `id` | `str` |  |
| `included` | `list` |  |

#### Example: Load

```python
workspace = client.Workspace().load({"id": "workspace_id"})
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── orbit_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`orbit_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
note = client.Note()
note.load({"member_slug": "example", "workspace_slug": "example"})

# note.data_get() now returns the note data from the last load
# note.match_get() returns the last match criteria
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
