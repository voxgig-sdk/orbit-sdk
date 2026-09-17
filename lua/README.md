# Orbit Lua SDK



The Lua SDK for the Orbit API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Activity()` — each with the same small set of operations (`load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/orbit-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("orbit_sdk")

local client = sdk.new({
  apikey = os.getenv("ORBIT_APIKEY"),
})
```

### 3. Load an activity

Activity is nested under workspace_slug, so provide the `workspace_slug`.

```lua
local activity, err = client:Activity():load({ workspace_slug = "example_workspace_slug" })
if err then error(err) end
print(activity)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Activity():create({ workspace_slug = "example_workspace_slug", identity = {}, title = "example_title" })
if err then error(err) end

-- Update
client:Activity():update({ id = created:data_get()["id"], member_id = "example_member_id", workspace_slug = "example_workspace_slug" })

-- Remove
client:Activity():remove({ id = created:data_get()["id"], member_id = "example_member_id", workspace_slug = "example_workspace_slug" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local note, err = client:Note():load({ member_slug = "example", workspace_slug = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Note():load({ member_slug = "example", workspace_slug = "example" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### OrbitSDK

```lua
local sdk = require("orbit_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OrbitSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local activity, err = client:Activity():load({ id = "example_id" })
    if err then error(err) end
    -- activity is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local activity = client:Activity(nil)`

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
| `activity` | `any` |  |
| `activity_type` | `string` | The type of activity - what action was done by the member. |
| `activity_type_key` | `string` | The key for a custom activity type for the workspace. |
| `data` | `table` |  |
| `description` | `string` | A description of the activity; displayed in the timeline |
| `id` | `string` |  |
| `identity` | `table` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `table` |  |
| `key` | `string` | Supply a key that must be unique or leave blank to have one generated. |
| `link` | `string` | A URL for the activity; displayed in the timeline |
| `link_text` | `string` | The text for the timeline link |
| `links` | `table` |  |
| `occurred_at` | `string` | The date and time the activity occurred; defaults to now |
| `properties` | `table` | Key-value pairs to provide contextual metadata about an activity. |
| `title` | `string` | A title for the activity; displayed in the timeline |
| `weight` | `string` | A custom weight to be used in filters and reports; defaults to 1. |

#### Example: Load

```lua
local activity, err = client:Activity():load({ id = "activity_id", workspace_slug = "workspace_slug" })
```

#### Example: Create

```lua
local activity, err = client:Activity():create({
  workspace_slug = "example_workspace_slug", -- string
  identity = {}, -- table
  title = "example_title", -- string
})
```


### ActivityType

Create an instance: `local activity_type = client:ActivityType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `links` | `table` |  |

#### Example: Load

```lua
local activity_type, err = client:ActivityType():load({ workspace_slug = "workspace_slug" })
```


### Member

Create an instance: `local member = client:Member(nil)`

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
| `data` | `table` |  |
| `devto` | `string` | The member's DEV username |
| `email` | `string` | The member's email |
| `github` | `string` | The member's GitHub username |
| `id` | `string` |  |
| `identity` | `table` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `table` |  |
| `linkedin` | `string` | The member's LinkedIn username, without the in/ or pub/ |
| `links` | `table` |  |
| `location` | `string` |  |
| `member` | `table` |  |
| `name` | `string` |  |
| `pronouns` | `string` |  |
| `shipping_address` | `string` |  |
| `slug` | `string` |  |
| `tag_list` | `string` | Deprecated: Please use the tags attribute instead |
| `tags` | `string` | Replaces all tags for the member; comma-separated string or array |
| `tags_to_add` | `string` | Adds tags to member; comma-separated string or array |
| `teammate` | `boolean` |  |
| `title` | `string` |  |
| `tshirt` | `string` |  |
| `twitter` | `string` | The member's Twitter username |
| `url` | `string` |  |

#### Example: Load

```lua
local member, err = client:Member():load({ id = "member_id", workspace_slug = "workspace_slug" })
```

#### Example: Create

```lua
local member, err = client:Member():create({
  workspace_slug = "example_workspace_slug", -- string
  identity = {}, -- table
})
```


### Note

Create an instance: `local note = client:Note(nil)`

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
| `data` | `table` |  |
| `id` | `string` |  |
| `included` | `table` |  |
| `links` | `table` |  |

#### Example: Load

```lua
local note, err = client:Note():load({ member_slug = "member_slug", workspace_slug = "workspace_slug" })
```

#### Example: Create

```lua
local note, err = client:Note():create({
  member_slug = "example_member_slug", -- string
  workspace_slug = "example_workspace_slug", -- string
  body = "example_body", -- string
})
```


### Organization

Create an instance: `local organization = client:Organization(nil)`

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
| `data` | `table` |  |
| `deal_closed_date` | `string` | The date the organization became a customer. |
| `id` | `string` |  |
| `lifecycle_stage` | `string` | The current stage of the organization in the marketing or sales process. |
| `links` | `table` |  |
| `owner_email` | `string` | The email of the team member who is in charge of the organization. |
| `owner_name` | `string` | The name of the team member who is in charge of the organization. |
| `price_plan` | `string` | The pricing plan the organization is on. |
| `source` | `string` | The name of the CRM you use for tracking the organization. |

#### Example: Load

```lua
local organization, err = client:Organization():load({ id = "organization_id", workspace_slug = "workspace_slug" })
```


### Report

Create an instance: `local report = client:Report(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |

#### Example: Load

```lua
local report, err = client:Report():load({ workspace_slug = "workspace_slug" })
```


### User

Create an instance: `local user = client:User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |

#### Example: Load

```lua
local user, err = client:User():load()
```


### Webhook

Create an instance: `local webhook = client:Webhook(nil)`

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
| `activity_tags` | `table` |  |
| `activity_types` | `table` |  |
| `data` | `table` |  |
| `event_type` | `string` |  |
| `id` | `string` |  |
| `links` | `table` |  |
| `member_tags` | `table` |  |
| `name` | `string` |  |
| `secret` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local webhook, err = client:Webhook():load({ id = "webhook_id", workspace_slug = "workspace_slug" })
```

#### Example: Create

```lua
local webhook, err = client:Webhook():create({
  workspace_slug = "example_workspace_slug", -- string
  event_type = "example_event_type", -- string
  name = "example_name", -- string
  url = "example_url", -- string
})
```


### Workspace

Create an instance: `local workspace = client:Workspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `id` | `string` |  |
| `included` | `table` |  |

#### Example: Load

```lua
local workspace, err = client:Workspace():load({ id = "workspace_id" })
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── orbit_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`orbit_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local note = client:Note()
note:load({ member_slug = "example", workspace_slug = "example" })

-- note:data_get() now returns the note data from the last load
-- note:match_get() returns the last match criteria
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
