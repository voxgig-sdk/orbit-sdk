
const { BaseFeature } = require('./feature/base/BaseFeature')
const { DebugFeature } = require('./feature/debug/DebugFeature')
const { IdempotencyFeature } = require('./feature/idempotency/IdempotencyFeature')
const { MetricsFeature } = require('./feature/metrics/MetricsFeature')
const { PagingFeature } = require('./feature/paging/PagingFeature')
const { RatelimitFeature } = require('./feature/ratelimit/RatelimitFeature')
const { RetryFeature } = require('./feature/retry/RetryFeature')
const { TestFeature } = require('./feature/test/TestFeature')
const { TimeoutFeature } = require('./feature/timeout/TimeoutFeature')



const FEATURE_CLASS = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Orbit',
        slug: "orbit",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://app.orbit.love/api/v1",

    auth: {
      prefix: '',
      in: 'query',
      name: 'api_key',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        activity: {
        },
  
        activity_type: {
        },
  
        member: {
        },
  
        note: {
        },
  
        organization: {
        },
  
        report: {
        },
  
        user: {
        },
  
        webhook: {
        },
  
        workspace: {
        },
  
    }
  }


  entity = {
    "activity": {
      "fields": [
        {
          "name": "activity",
          "type": "`$ANY`",
          "union": {
            "branches": 2,
            "count": 1,
            "depth": 0
          }
        },
        {
          "name": "activity_type",
          "short": "The type of activity - what action was done by the member.",
          "type": "`$STRING`"
        },
        {
          "name": "activity_type_key",
          "short": "The key for a custom activity type for the workspace.",
          "type": "`$STRING`"
        },
        {
          "name": "data",
          "type": "`$ARRAY`"
        },
        {
          "name": "description",
          "short": "A description of the activity; displayed in the timeline",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "identity",
          "req": true,
          "short": "Represents an email address, a profile on networks like github and twitter, or a record in another system.",
          "type": "`$OBJECT`"
        },
        {
          "name": "included",
          "type": "`$ARRAY`"
        },
        {
          "name": "key",
          "short": "Supply a key that must be unique or leave blank to have one generated.",
          "type": "`$STRING`"
        },
        {
          "name": "link",
          "short": "A URL for the activity; displayed in the timeline",
          "type": "`$STRING`"
        },
        {
          "name": "link_text",
          "short": "The text for the timeline link",
          "type": "`$STRING`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        },
        {
          "name": "occurred_at",
          "short": "The date and time the activity occurred; defaults to now",
          "type": "`$STRING`"
        },
        {
          "name": "properties",
          "short": "Key-value pairs to provide contextual metadata about an activity.",
          "type": "`$OBJECT`"
        },
        {
          "name": "title",
          "req": true,
          "short": "A title for the activity; displayed in the timeline",
          "type": "`$STRING`"
        },
        {
          "name": "weight",
          "short": "A custom weight to be used in filters and reports; defaults to 1.",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "activity",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "member_slug",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{workspace_slug}/members/{member_slug}/activities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_slug"
                },
                {
                  "lit": "activities"
                }
              ],
              "select": {
                "exist": [
                  "member_slug",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_slug}",
                "activities"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{workspace_slug}/activities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "activities"
                }
              ],
              "select": {
                "exist": [
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": {
                  "activity": "`reqdata`"
                },
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "activities"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "activity_type",
                    "orig": "activity_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "affiliation",
                    "orig": "affiliation",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "company",
                    "orig": "company",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "identity",
                    "orig": "identity",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "item",
                    "orig": "item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "member_tag",
                    "orig": "member_tag",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "orbit",
                    "orig": "orbit",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "relative",
                    "orig": "relative",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/activities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "activities"
                }
              ],
              "select": {
                "exist": [
                  "activity_type",
                  "affiliation",
                  "city",
                  "company",
                  "country",
                  "direction",
                  "end_date",
                  "identity",
                  "item",
                  "member_tag",
                  "orbit",
                  "page",
                  "region",
                  "relative",
                  "sort",
                  "start_date",
                  "title",
                  "type",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "activities"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "member_slug",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "activity_type",
                    "orig": "activity_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "item",
                    "orig": "item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/members/{member_slug}/activities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_slug"
                },
                {
                  "lit": "activities"
                }
              ],
              "select": {
                "exist": [
                  "activity_type",
                  "direction",
                  "item",
                  "member_slug",
                  "page",
                  "sort",
                  "type",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_slug}",
                "activities"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "organization_id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "activity_type",
                    "orig": "activity_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "item",
                    "orig": "item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/organizations/{organization_id}/activities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "organization_id"
                },
                {
                  "lit": "activities"
                }
              ],
              "select": {
                "exist": [
                  "activity_type",
                  "direction",
                  "item",
                  "organization_id",
                  "page",
                  "sort",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "organizations",
                "{organization_id}",
                "activities"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/activities/{id}",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "activities"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "activities",
                "{id}"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "member_id",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/{workspace_slug}/members/{member_slug}/activities/{id}",
              "rename": {
                "param": {
                  "member_slug": "member_id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_id"
                },
                {
                  "lit": "activities"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "member_id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_id}",
                "activities",
                "{id}"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "member_id",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/{workspace_slug}/members/{member_slug}/activities/{id}",
              "rename": {
                "param": {
                  "member_slug": "member_id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_id"
                },
                {
                  "lit": "activities"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "member_id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_id}",
                "activities",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "member"
          ],
          [
            "organization"
          ]
        ]
      }
    },
    "activity_type": {
      "fields": [
        {
          "name": "data",
          "type": "`$ARRAY`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        }
      ],
      "name": "activity_type",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/activity_types",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "activity_types"
                }
              ],
              "select": {
                "exist": [
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "activity_types"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "member": {
      "fields": [
        {
          "name": "bio",
          "type": "`$STRING`"
        },
        {
          "name": "birthday",
          "type": "`$STRING`"
        },
        {
          "name": "company",
          "type": "`$STRING`"
        },
        {
          "name": "data",
          "type": "`$ARRAY`"
        },
        {
          "name": "devto",
          "short": "The member's DEV username",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "short": "The member's email",
          "type": "`$STRING`"
        },
        {
          "name": "github",
          "short": "The member's GitHub username",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "identity",
          "req": true,
          "short": "Represents an email address, a profile on networks like github and twitter, or a record in another system.",
          "type": "`$OBJECT`"
        },
        {
          "name": "included",
          "type": "`$ARRAY`"
        },
        {
          "name": "linkedin",
          "short": "The member's LinkedIn username, without the in/ or pub/",
          "type": "`$STRING`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        },
        {
          "name": "location",
          "type": "`$STRING`"
        },
        {
          "name": "member",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "pronouns",
          "type": "`$STRING`"
        },
        {
          "name": "shipping_address",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "type": "`$STRING`"
        },
        {
          "name": "tag_list",
          "short": "Deprecated: Please use the tags attribute instead",
          "type": "`$STRING`"
        },
        {
          "name": "tags",
          "short": "Replaces all tags for the member; comma-separated string or array",
          "type": "`$STRING`"
        },
        {
          "name": "tags_to_add",
          "short": "Adds tags to member; comma-separated string or array",
          "type": "`$STRING`"
        },
        {
          "name": "teammate",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "title",
          "type": "`$STRING`"
        },
        {
          "name": "tshirt",
          "type": "`$STRING`"
        },
        {
          "name": "twitter",
          "short": "The member's Twitter username",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "member",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "member_slug",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{workspace_slug}/members/{member_slug}/identities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_slug"
                },
                {
                  "lit": "identities"
                }
              ],
              "select": {
                "$action": "identity",
                "exist": [
                  "member_slug",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_slug}",
                "identities"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{workspace_slug}/members",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                }
              ],
              "select": {
                "exist": [
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": {
                  "member": "`reqdata`"
                },
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "activities_count_max",
                    "orig": "activities_count_max",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "activities_count_min",
                    "orig": "activities_count_min",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "activity_type",
                    "orig": "activity_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "affiliation",
                    "orig": "affiliation",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "company",
                    "orig": "company",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "identity",
                    "orig": "identity",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "item",
                    "orig": "item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "member_tag",
                    "orig": "member_tag",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "orbit",
                    "orig": "orbit",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "relative",
                    "orig": "relative",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "title",
                    "orig": "title",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/members",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                }
              ],
              "select": {
                "exist": [
                  "activities_count_max",
                  "activities_count_min",
                  "activity_type",
                  "affiliation",
                  "city",
                  "company",
                  "country",
                  "direction",
                  "end_date",
                  "identity",
                  "item",
                  "member_tag",
                  "orbit",
                  "page",
                  "query",
                  "region",
                  "relative",
                  "sort",
                  "start_date",
                  "title",
                  "type",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "email",
                    "orig": "email",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "github",
                    "orig": "github",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "source_host",
                    "orig": "source_host",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "uid",
                    "orig": "uid",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "username",
                    "orig": "username",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/members/find",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "lit": "find"
                }
              ],
              "select": {
                "$action": "find",
                "exist": [
                  "email",
                  "github",
                  "source",
                  "source_host",
                  "uid",
                  "username",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "find"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "organization_id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "item",
                    "orig": "item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/organizations/{organization_id}/members",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "organization_id"
                },
                {
                  "lit": "members"
                }
              ],
              "select": {
                "exist": [
                  "item",
                  "organization_id",
                  "page",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "organizations",
                "{organization_id}",
                "members"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/members/{member_slug}",
              "rename": {
                "param": {
                  "member_slug": "id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{id}"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/{workspace_slug}/members/{member_slug}",
              "rename": {
                "param": {
                  "member_slug": "id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "member_slug",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/{workspace_slug}/members/{member_slug}/identities",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_slug"
                },
                {
                  "lit": "identities"
                }
              ],
              "select": {
                "$action": "identity",
                "exist": [
                  "member_slug",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_slug}",
                "identities"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/{workspace_slug}/members/{member_slug}",
              "rename": {
                "param": {
                  "member_slug": "id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "member"
          ],
          [
            "organization"
          ]
        ]
      }
    },
    "note": {
      "fields": [
        {
          "name": "body",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "data",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "included",
          "type": "`$ARRAY`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "note",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "member_slug",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{workspace_slug}/members/{member_slug}/notes",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_slug"
                },
                {
                  "lit": "notes"
                }
              ],
              "select": {
                "exist": [
                  "member_slug",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_slug}",
                "notes"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "member_slug",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/members/{member_slug}/notes",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_slug"
                },
                {
                  "lit": "notes"
                }
              ],
              "select": {
                "exist": [
                  "member_slug",
                  "page",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_slug}",
                "notes"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "member_id",
                    "orig": "member_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/{workspace_slug}/members/{member_slug}/notes/{id}",
              "rename": {
                "param": {
                  "member_slug": "member_id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "members"
                },
                {
                  "var": "member_id"
                },
                {
                  "lit": "notes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "member_id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "members",
                "{member_id}",
                "notes",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "member"
          ]
        ]
      }
    },
    "organization": {
      "fields": [
        {
          "name": "crm_uid",
          "short": "The unique identifier of the organization in your CRM.",
          "type": "`$STRING`"
        },
        {
          "name": "crm_url",
          "req": true,
          "short": "A link to the organization profile in your CRM.",
          "type": "`$STRING`"
        },
        {
          "name": "data",
          "type": "`$ARRAY`"
        },
        {
          "name": "deal_closed_date",
          "short": "The date the organization became a customer.",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "lifecycle_stage",
          "req": true,
          "short": "The current stage of the organization in the marketing or sales process.",
          "type": "`$STRING`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        },
        {
          "name": "owner_email",
          "short": "The email of the team member who is in charge of the organization.",
          "type": "`$STRING`"
        },
        {
          "name": "owner_name",
          "short": "The name of the team member who is in charge of the organization.",
          "type": "`$STRING`"
        },
        {
          "name": "price_plan",
          "short": "The pricing plan the organization is on.",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "req": true,
          "short": "The name of the CRM you use for tracking the organization.",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "organization",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "item",
                    "orig": "item",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/organizations",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "organizations"
                }
              ],
              "select": {
                "exist": [
                  "direction",
                  "item",
                  "page",
                  "query",
                  "sort",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "organizations"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/organizations/{organization_id}",
              "rename": {
                "param": {
                  "organization_id": "id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "organizations",
                "{id}"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "organization_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/{workspace_slug}/organizations/{organization_id}",
              "rename": {
                "param": {
                  "organization_id": "id"
                }
              },
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "organizations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "organizations",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "report": {
      "fields": [
        {
          "name": "data",
          "type": "`$OBJECT`"
        }
      ],
      "name": "report",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "activity_type",
                    "orig": "activity_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "property",
                    "orig": "property",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "relative",
                    "orig": "relative",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/reports",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "reports"
                }
              ],
              "select": {
                "exist": [
                  "activity_type",
                  "end_date",
                  "property",
                  "relative",
                  "start_date",
                  "type",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "reports"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "data",
          "type": "`$OBJECT`"
        }
      ],
      "name": "user",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/user",
              "segments": [
                {
                  "lit": "user"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "user"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "webhook": {
      "fields": [
        {
          "name": "activity_tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "activity_types",
          "type": "`$ARRAY`"
        },
        {
          "name": "data",
          "type": "`$OBJECT`"
        },
        {
          "name": "event_type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "links",
          "type": "`$OBJECT`"
        },
        {
          "name": "member_tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "secret",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "webhook",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{workspace_slug}/webhooks",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "webhooks"
                }
              ],
              "select": {
                "exist": [
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "webhooks"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/webhooks/{id}",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "webhooks"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "webhooks",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{workspace_slug}/webhooks",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "webhooks"
                }
              ],
              "select": {
                "exist": [
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "webhooks"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/{workspace_slug}/webhooks/{id}",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "webhooks"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "webhooks",
                "{id}"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "workspace_slug",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/{workspace_slug}/webhooks/{id}",
              "segments": [
                {
                  "var": "workspace_slug"
                },
                {
                  "lit": "webhooks"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "workspace_slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "{workspace_slug}",
                "webhooks",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "workspace": {
      "fields": [
        {
          "name": "data",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "included",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "workspace",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "workspace_slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "include_orbit_level_count",
                    "orig": "include_orbit_level_count",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/workspaces/{workspace_slug}",
              "rename": {
                "param": {
                  "workspace_slug": "id"
                }
              },
              "segments": [
                {
                  "lit": "workspaces"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "include_orbit_level_count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "workspaces",
                "{id}"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/workspaces",
              "segments": [
                {
                  "lit": "workspaces"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "workspaces"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

