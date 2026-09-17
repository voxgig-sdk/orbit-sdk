# Orbit Golang SDK



The Golang SDK for the Orbit API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Activity(nil)` — each with the same small set of operations (`Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/orbit-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/orbit-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/orbit-sdk/go=../orbit-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/orbit-sdk/go"
)

func main() {
    client := sdk.NewOrbitSDK(map[string]any{
        "apikey": os.Getenv("ORBIT_APIKEY"),
    })

    // Load a single activity — the value is the loaded record.
    activity, err := client.Activity(nil).Load(map[string]any{"id": "example_id", "workspace_slug": "example_workspace_slug"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(activity)

    // Create a activity.
    created, err := client.Activity(nil).Create(map[string]any{"workspace_slug": "example_workspace_slug", "identity": map[string]any{}, "title": "example_title"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a activity.
    updated, err := client.Activity(nil).Update(map[string]any{"id": "example_id", "member_id": "example_member_id", "workspace_slug": "example_workspace_slug"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)

    // Remove a activity.
    removed, err := client.Activity(nil).Remove(map[string]any{"id": "example_id", "member_id": "example_member_id", "workspace_slug": "example_workspace_slug"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
note, err := client.Note(nil).Load(map[string]any{"member_slug": "example", "workspace_slug": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = note
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

note, err := client.Note(nil).Load(
    map[string]any{"member_slug": "example", "workspace_slug": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(note) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOrbitSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewOrbitSDK

```go
func NewOrbitSDK(options map[string]any) *OrbitSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OrbitSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OrbitSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Activity` | `(data map[string]any) OrbitEntity` | Create an Activity entity instance. |
| `ActivityType` | `(data map[string]any) OrbitEntity` | Create an ActivityType entity instance. |
| `Member` | `(data map[string]any) OrbitEntity` | Create a Member entity instance. |
| `Note` | `(data map[string]any) OrbitEntity` | Create a Note entity instance. |
| `Organization` | `(data map[string]any) OrbitEntity` | Create an Organization entity instance. |
| `Report` | `(data map[string]any) OrbitEntity` | Create a Report entity instance. |
| `User` | `(data map[string]any) OrbitEntity` | Create an User entity instance. |
| `Webhook` | `(data map[string]any) OrbitEntity` | Create a Webhook entity instance. |
| `Workspace` | `(data map[string]any) OrbitEntity` | Create a Workspace entity instance. |

### Entity interface (OrbitEntity)

All entities implement the `OrbitEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    activity, err := client.Activity(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // activity is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Activity

| Field | Description |
| --- | --- |
| `"activity"` |  |
| `"activity_type"` | The type of activity - what action was done by the member. |
| `"activity_type_key"` | The key for a custom activity type for the workspace. |
| `"data"` |  |
| `"description"` | A description of the activity; displayed in the timeline |
| `"id"` |  |
| `"identity"` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `"included"` |  |
| `"key"` | Supply a key that must be unique or leave blank to have one generated. |
| `"link"` | A URL for the activity; displayed in the timeline |
| `"link_text"` | The text for the timeline link |
| `"links"` |  |
| `"occurred_at"` | The date and time the activity occurred; defaults to now |
| `"properties"` | Key-value pairs to provide contextual metadata about an activity. |
| `"title"` | A title for the activity; displayed in the timeline |
| `"weight"` | A custom weight to be used in filters and reports; defaults to 1. |

Operations: Create, Load, Remove, Update.

API path: `/{workspace_slug}/members/{member_slug}/activities`

#### ActivityType

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"links"` |  |

Operations: Load.

API path: `/{workspace_slug}/activity_types`

#### Member

| Field | Description |
| --- | --- |
| `"bio"` |  |
| `"birthday"` |  |
| `"company"` |  |
| `"data"` |  |
| `"devto"` | The member's DEV username |
| `"email"` | The member's email |
| `"github"` | The member's GitHub username |
| `"id"` |  |
| `"identity"` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `"included"` |  |
| `"linkedin"` | The member's LinkedIn username, without the in/ or pub/ |
| `"links"` |  |
| `"location"` |  |
| `"member"` |  |
| `"name"` |  |
| `"pronouns"` |  |
| `"shipping_address"` |  |
| `"slug"` |  |
| `"tag_list"` | Deprecated: Please use the tags attribute instead |
| `"tags"` | Replaces all tags for the member; comma-separated string or array |
| `"tags_to_add"` | Adds tags to member; comma-separated string or array |
| `"teammate"` |  |
| `"title"` |  |
| `"tshirt"` |  |
| `"twitter"` | The member's Twitter username |
| `"url"` |  |

Operations: Create, Load, Remove, Update.

API path: `/{workspace_slug}/members/{member_slug}/identities`

#### Note

| Field | Description |
| --- | --- |
| `"body"` |  |
| `"data"` |  |
| `"id"` |  |
| `"included"` |  |
| `"links"` |  |

Operations: Create, Load, Update.

API path: `/{workspace_slug}/members/{member_slug}/notes`

#### Organization

| Field | Description |
| --- | --- |
| `"crm_uid"` | The unique identifier of the organization in your CRM. |
| `"crm_url"` | A link to the organization profile in your CRM. |
| `"data"` |  |
| `"deal_closed_date"` | The date the organization became a customer. |
| `"id"` |  |
| `"lifecycle_stage"` | The current stage of the organization in the marketing or sales process. |
| `"links"` |  |
| `"owner_email"` | The email of the team member who is in charge of the organization. |
| `"owner_name"` | The name of the team member who is in charge of the organization. |
| `"price_plan"` | The pricing plan the organization is on. |
| `"source"` | The name of the CRM you use for tracking the organization. |

Operations: Load, Update.

API path: `/{workspace_slug}/organizations`

#### Report

| Field | Description |
| --- | --- |
| `"data"` |  |

Operations: Load.

API path: `/{workspace_slug}/reports`

#### User

| Field | Description |
| --- | --- |
| `"data"` |  |

Operations: Load.

API path: `/user`

#### Webhook

| Field | Description |
| --- | --- |
| `"activity_tags"` |  |
| `"activity_types"` |  |
| `"data"` |  |
| `"event_type"` |  |
| `"id"` |  |
| `"links"` |  |
| `"member_tags"` |  |
| `"name"` |  |
| `"secret"` |  |
| `"url"` |  |

Operations: Create, Load, Remove, Update.

API path: `/{workspace_slug}/webhooks`

#### Workspace

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"id"` |  |
| `"included"` |  |

Operations: Load.

API path: `/workspaces/{workspace_slug}`



## Entities


### Activity

Create an instance: `activity := client.Activity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity` | `any` |  |
| `activity_type` | `string` | The type of activity - what action was done by the member. |
| `activity_type_key` | `string` | The key for a custom activity type for the workspace. |
| `data` | `[]any` |  |
| `description` | `string` | A description of the activity; displayed in the timeline |
| `id` | `string` |  |
| `identity` | `map[string]any` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `[]any` |  |
| `key` | `string` | Supply a key that must be unique or leave blank to have one generated. |
| `link` | `string` | A URL for the activity; displayed in the timeline |
| `link_text` | `string` | The text for the timeline link |
| `links` | `map[string]any` |  |
| `occurred_at` | `string` | The date and time the activity occurred; defaults to now |
| `properties` | `map[string]any` | Key-value pairs to provide contextual metadata about an activity. |
| `title` | `string` | A title for the activity; displayed in the timeline |
| `weight` | `string` | A custom weight to be used in filters and reports; defaults to 1. |

#### Example: Load

```go
activity, err := client.Activity(nil).Load(map[string]any{"id": "activity_id", "workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(activity) // the loaded record
```

#### Example: Create

```go
result, err := client.Activity(nil).Create(map[string]any{
    "workspace_slug": "example_workspace_slug",
    "identity": map[string]any{},
    "title": "example_title",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### ActivityType

Create an instance: `activityType := client.ActivityType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `links` | `map[string]any` |  |

#### Example: Load

```go
activityType, err := client.ActivityType(nil).Load(map[string]any{"workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(activityType) // the loaded record
```


### Member

Create an instance: `member := client.Member(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `string` |  |
| `birthday` | `string` |  |
| `company` | `string` |  |
| `data` | `[]any` |  |
| `devto` | `string` | The member's DEV username |
| `email` | `string` | The member's email |
| `github` | `string` | The member's GitHub username |
| `id` | `string` |  |
| `identity` | `map[string]any` | Represents an email address, a profile on networks like github and twitter, or a record in another system. |
| `included` | `[]any` |  |
| `linkedin` | `string` | The member's LinkedIn username, without the in/ or pub/ |
| `links` | `map[string]any` |  |
| `location` | `string` |  |
| `member` | `map[string]any` |  |
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

```go
member, err := client.Member(nil).Load(map[string]any{"id": "member_id", "workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(member) // the loaded record
```

#### Example: Create

```go
result, err := client.Member(nil).Create(map[string]any{
    "workspace_slug": "example_workspace_slug",
    "identity": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Note

Create an instance: `note := client.Note(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` |  |
| `data` | `[]any` |  |
| `id` | `string` |  |
| `included` | `[]any` |  |
| `links` | `map[string]any` |  |

#### Example: Load

```go
note, err := client.Note(nil).Load(map[string]any{"member_slug": "member_slug", "workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(note) // the loaded record
```

#### Example: Create

```go
result, err := client.Note(nil).Create(map[string]any{
    "member_slug": "example_member_slug",
    "workspace_slug": "example_workspace_slug",
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Organization

Create an instance: `organization := client.Organization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crm_uid` | `string` | The unique identifier of the organization in your CRM. |
| `crm_url` | `string` | A link to the organization profile in your CRM. |
| `data` | `[]any` |  |
| `deal_closed_date` | `string` | The date the organization became a customer. |
| `id` | `string` |  |
| `lifecycle_stage` | `string` | The current stage of the organization in the marketing or sales process. |
| `links` | `map[string]any` |  |
| `owner_email` | `string` | The email of the team member who is in charge of the organization. |
| `owner_name` | `string` | The name of the team member who is in charge of the organization. |
| `price_plan` | `string` | The pricing plan the organization is on. |
| `source` | `string` | The name of the CRM you use for tracking the organization. |

#### Example: Load

```go
organization, err := client.Organization(nil).Load(map[string]any{"id": "organization_id", "workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(organization) // the loaded record
```


### Report

Create an instance: `report := client.Report(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |

#### Example: Load

```go
report, err := client.Report(nil).Load(map[string]any{"workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(report) // the loaded record
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |

#### Example: Load

```go
user, err := client.User(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `activity_tags` | `[]any` |  |
| `activity_types` | `[]any` |  |
| `data` | `map[string]any` |  |
| `event_type` | `string` |  |
| `id` | `string` |  |
| `links` | `map[string]any` |  |
| `member_tags` | `[]any` |  |
| `name` | `string` |  |
| `secret` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
webhook, err := client.Webhook(nil).Load(map[string]any{"id": "webhook_id", "workspace_slug": "workspace_slug"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhook) // the loaded record
```

#### Example: Create

```go
result, err := client.Webhook(nil).Create(map[string]any{
    "workspace_slug": "example_workspace_slug",
    "event_type": "example_event_type",
    "name": "example_name",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Workspace

Create an instance: `workspace := client.Workspace(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `id` | `string` |  |
| `included` | `[]any` |  |

#### Example: Load

```go
workspace, err := client.Workspace(nil).Load(map[string]any{"id": "workspace_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workspace) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/orbit-sdk/go/
├── orbit.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/orbit-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
note := client.Note(nil)
note.Load(map[string]any{"member_slug": "example", "workspace_slug": "example"}, nil)

// note.Data() now returns the note data from the last load
// note.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
