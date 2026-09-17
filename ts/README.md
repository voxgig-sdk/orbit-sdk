# Orbit TypeScript SDK



The TypeScript SDK for the Orbit API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Activity()` — each with a small set of operations (`load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/orbit-sdk/releases](https://github.com/voxgig-sdk/orbit-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OrbitSDK } from '@voxgig-sdk/orbit'

const client = new OrbitSDK({
  apikey: process.env.ORBIT_APIKEY,
})
```

### 3. Load an activity

Activity is nested under workspace_slug, so provide the `workspace_slug`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const activity = await client.Activity().load({
    workspace_slug: 'example_workspace_slug',
  })
  console.log(activity)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Activity ENTITY (.data() for the record)
const created = await client.Activity().create({
  workspace_slug: 'example_workspace_slug',
  identity: {},
  title: 'example_title',
})

// Update — the id comes off the returned entity's data()
const updated = await client.Activity().update({
  id: created.data().id!,
  member_id: 'example_member_id',
  workspace_slug: 'example_workspace_slug',
})

// Remove
await client.Activity().remove({
  id: created.data().id!,
  member_id: 'example_member_id',
  workspace_slug: 'example_workspace_slug',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const note = await client.Note().load({ member_slug: "example", workspace_slug: "example" })
  console.log(note)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OrbitSDK.test()

const note = await client.Note().load({ member_slug: 'example_member_slug', workspace_slug: 'example_workspace_slug' })
// note is the entity, populated with mock response data
// — call note.data() for the record itself
console.log(note)
```

You can also use the instance method:

```ts
const client = new OrbitSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Note()

// First call runs the operation and stores its result
await entity.load({ member_slug: 'example_member_slug', workspace_slug: 'example_workspace_slug' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OrbitSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### OrbitSDK

#### Constructor

```ts
new OrbitSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Activity(data?)` | `ActivityEntity` | Create an Activity entity instance. |
| `ActivityType(data?)` | `ActivityTypeEntity` | Create an ActivityType entity instance. |
| `Member(data?)` | `MemberEntity` | Create a Member entity instance. |
| `Note(data?)` | `NoteEntity` | Create a Note entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `Report(data?)` | `ReportEntity` | Create a Report entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `Workspace(data?)` | `WorkspaceEntity` | Create a Workspace entity instance. |
| `tester(testopts?, sdkopts?)` | `OrbitSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OrbitSDK.test(testopts?, sdkopts?)` | `OrbitSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OrbitSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create, load, remove, update.

API path: `/{workspace_slug}/members/{member_slug}/activities`

#### ActivityType

| Field | Description |
| --- | --- |
| `data` |  |
| `links` |  |

Operations: load.

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

Operations: create, load, remove, update.

API path: `/{workspace_slug}/members/{member_slug}/identities`

#### Note

| Field | Description |
| --- | --- |
| `body` |  |
| `data` |  |
| `id` |  |
| `included` |  |
| `links` |  |

Operations: create, load, update.

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

Operations: load, update.

API path: `/{workspace_slug}/organizations`

#### Report

| Field | Description |
| --- | --- |
| `data` |  |

Operations: load.

API path: `/{workspace_slug}/reports`

#### User

| Field | Description |
| --- | --- |
| `data` |  |

Operations: load.

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

Operations: create, load, remove, update.

API path: `/{workspace_slug}/webhooks`

#### Workspace

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `included` |  |

Operations: load.

API path: `/workspaces/{workspace_slug}`



## Entities


### Activity

Create an instance: `const activity = client.Activity()`

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
| `data` | `any[]` |  |
| `description` | `string` | A description of the activity; displayed in the timeline |
| `id` | `string` |  |
| `identity` | `Record<string, any>` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `any[]` |  |
| `key` | `string` | Supply a key that must be unique or leave blank to have one generated. |
| `link` | `string` | A URL for the activity; displayed in the timeline |
| `link_text` | `string` | The text for the timeline link |
| `links` | `Record<string, any>` |  |
| `occurred_at` | `string` | The date and time the activity occurred; defaults to now |
| `properties` | `Record<string, any>` | Key-value pairs to provide contextual metadata about an activity. |
| `title` | `string` | A title for the activity; displayed in the timeline |
| `weight` | `string` | A custom weight to be used in filters and reports; defaults to 1. |

#### Example: Load

```ts
const activity = await client.Activity().load({ id: 'activity_id', workspace_slug: 'workspace_slug' })
```

#### Example: Create

```ts
const activity = await client.Activity().create({
  workspace_slug: 'example_workspace_slug',
  identity: {},
  title: 'example_title',
})
```


### ActivityType

Create an instance: `const activity_type = client.ActivityType()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `links` | `Record<string, any>` |  |

#### Example: Load

```ts
const activity_type = await client.ActivityType().load({ workspace_slug: 'workspace_slug' })
```


### Member

Create an instance: `const member = client.Member()`

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
| `data` | `any[]` |  |
| `devto` | `string` | The member's DEV username |
| `email` | `string` | The member's email |
| `github` | `string` | The member's GitHub username |
| `id` | `string` |  |
| `identity` | `Record<string, any>` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `any[]` |  |
| `linkedin` | `string` | The member's LinkedIn username, without the in/ or pub/ |
| `links` | `Record<string, any>` |  |
| `location` | `string` |  |
| `member` | `Record<string, any>` |  |
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

```ts
const member = await client.Member().load({ id: 'member_id', workspace_slug: 'workspace_slug' })
```

#### Example: Create

```ts
const member = await client.Member().create({
  workspace_slug: 'example_workspace_slug',
  identity: {},
})
```


### Note

Create an instance: `const note = client.Note()`

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
| `data` | `any[]` |  |
| `id` | `string` |  |
| `included` | `any[]` |  |
| `links` | `Record<string, any>` |  |

#### Example: Load

```ts
const note = await client.Note().load({ member_slug: 'member_slug', workspace_slug: 'workspace_slug' })
```

#### Example: Create

```ts
const note = await client.Note().create({
  member_slug: 'example_member_slug',
  workspace_slug: 'example_workspace_slug',
  body: 'example_body',
})
```


### Organization

Create an instance: `const organization = client.Organization()`

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
| `data` | `any[]` |  |
| `deal_closed_date` | `string` | The date the organization became a customer. |
| `id` | `string` |  |
| `lifecycle_stage` | `string` | The current stage of the organization in the marketing or sales process. |
| `links` | `Record<string, any>` |  |
| `owner_email` | `string` | The email of the team member who is in charge of the organization. |
| `owner_name` | `string` | The name of the team member who is in charge of the organization. |
| `price_plan` | `string` | The pricing plan the organization is on. |
| `source` | `string` | The name of the CRM you use for tracking the organization. |

#### Example: Load

```ts
const organization = await client.Organization().load({ id: 'organization_id', workspace_slug: 'workspace_slug' })
```


### Report

Create an instance: `const report = client.Report()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |

#### Example: Load

```ts
const report = await client.Report().load({ workspace_slug: 'workspace_slug' })
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |

#### Example: Load

```ts
const user = await client.User().load()
```


### Webhook

Create an instance: `const webhook = client.Webhook()`

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
| `activity_tags` | `any[]` |  |
| `activity_types` | `any[]` |  |
| `data` | `Record<string, any>` |  |
| `event_type` | `string` |  |
| `id` | `string` |  |
| `links` | `Record<string, any>` |  |
| `member_tags` | `any[]` |  |
| `name` | `string` |  |
| `secret` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const webhook = await client.Webhook().load({ id: 'webhook_id', workspace_slug: 'workspace_slug' })
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  workspace_slug: 'example_workspace_slug',
  event_type: 'example_event_type',
  name: 'example_name',
  url: 'example_url',
})
```


### Workspace

Create an instance: `const workspace = client.Workspace()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `id` | `string` |  |
| `included` | `any[]` |  |

#### Example: Load

```ts
const workspace = await client.Workspace().load({ id: 'workspace_id' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
orbit/
├── src/
│   ├── OrbitSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OrbitSDK } from '@voxgig-sdk/orbit'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const note = client.Note()
await note.load({ member_slug: "example", workspace_slug: "example" })

// note.data() now returns the note data from the last `load`
// note.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
