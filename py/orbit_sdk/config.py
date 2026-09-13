# Orbit SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Orbit",
            "slug": "orbit",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://app.orbit.love/api/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "member": {},
            },
        },
        "entity": {
      "member": {
        "fields": [
          {
            "name": "bio",
            "type": "`$STRING`",
          },
          {
            "name": "company",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "love",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "orbit_level",
            "type": "`$INTEGER`",
          },
          {
            "name": "reach",
            "type": "`$INTEGER`",
          },
          {
            "name": "slug",
            "type": "`$STRING`",
          },
          {
            "name": "tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "tags_to_add",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "name": "workspace",
                      "orig": "workspace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/{workspace}/members",
                "segments": [
                  {
                    "var": "workspace",
                  },
                  {
                    "lit": "members",
                  },
                ],
                "select": {
                  "exist": [
                    "workspace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "{workspace}",
                  "members",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "workspace",
                      "orig": "workspace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{workspace}/members",
                "segments": [
                  {
                    "var": "workspace",
                  },
                  {
                    "lit": "members",
                  },
                ],
                "select": {
                  "exist": [
                    "tag",
                    "workspace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "{workspace}",
                  "members",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "workspace",
                      "orig": "workspace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{workspace}/members/{id}",
                "segments": [
                  {
                    "var": "workspace",
                  },
                  {
                    "lit": "members",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "workspace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "{workspace}",
                  "members",
                  "{id}",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "workspace",
                      "orig": "workspace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/{workspace}/members/{id}",
                "segments": [
                  {
                    "var": "workspace",
                  },
                  {
                    "lit": "members",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "workspace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "{workspace}",
                  "members",
                  "{id}",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "workspace",
                      "orig": "workspace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/{workspace}/members/{id}",
                "segments": [
                  {
                    "var": "workspace",
                  },
                  {
                    "lit": "members",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                    "workspace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "{workspace}",
                  "members",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
