package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Orbit",
			"slug": "orbit",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://app.orbit.love/api/v1",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "api_key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"activity": map[string]any{},
				"activity_type": map[string]any{},
				"member": map[string]any{},
				"note": map[string]any{},
				"organization": map[string]any{},
				"report": map[string]any{},
				"user": map[string]any{},
				"webhook": map[string]any{},
				"workspace": map[string]any{},
			},
		},
		"entity": map[string]any{
			"activity": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "activity",
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "activity_type",
						"short": "The type of activity - what action was done by the member.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "activity_type_key",
						"short": "The key for a custom activity type for the workspace.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"short": "A description of the activity; displayed in the timeline",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identity",
						"req": true,
						"short": "Represents an email address, a profile on networks like github and twitter, or a record in another system.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "included",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "key",
						"short": "Supply a key that must be unique or leave blank to have one generated.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"short": "A URL for the activity; displayed in the timeline",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link_text",
						"short": "The text for the timeline link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "occurred_at",
						"short": "The date and time the activity occurred; defaults to now",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "properties",
						"short": "Key-value pairs to provide contextual metadata about an activity.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"short": "A title for the activity; displayed in the timeline",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weight",
						"short": "A custom weight to be used in filters and reports; defaults to 1.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "activity",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "member_slug",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{workspace_slug}/members/{member_slug}/activities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_slug",
									},
									map[string]any{
										"lit": "activities",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"member_slug",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_slug}",
									"activities",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{workspace_slug}/activities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "activities",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
										"activity": "`reqdata`",
									},
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"activities",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "activity_type",
											"orig": "activity_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "affiliation",
											"orig": "affiliation",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "identity",
											"orig": "identity",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "member_tag",
											"orig": "member_tag",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "orbit",
											"orig": "orbit",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "relative",
											"orig": "relative",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/activities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "activities",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"activities",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "member_slug",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "activity_type",
											"orig": "activity_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/members/{member_slug}/activities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_slug",
									},
									map[string]any{
										"lit": "activities",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"activity_type",
										"direction",
										"item",
										"member_slug",
										"page",
										"sort",
										"type",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_slug}",
									"activities",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "activity_type",
											"orig": "activity_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/organizations/{organization_id}/activities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_id",
									},
									map[string]any{
										"lit": "activities",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"activity_type",
										"direction",
										"item",
										"organization_id",
										"page",
										"sort",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"organizations",
									"{organization_id}",
									"activities",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/activities/{id}",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "activities",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"activities",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "member_id",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/{workspace_slug}/members/{member_slug}/activities/{id}",
								"rename": map[string]any{
									"param": map[string]any{
										"member_slug": "member_id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_id",
									},
									map[string]any{
										"lit": "activities",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"member_id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_id}",
									"activities",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "member_id",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/{workspace_slug}/members/{member_slug}/activities/{id}",
								"rename": map[string]any{
									"param": map[string]any{
										"member_slug": "member_id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_id",
									},
									map[string]any{
										"lit": "activities",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"member_id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_id}",
									"activities",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"member",
						},
						[]any{
							"organization",
						},
					},
				},
			},
			"activity_type": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
				},
				"name": "activity_type",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/activity_types",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "activity_types",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"activity_types",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"member": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "birthday",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "devto",
						"short": "The member's DEV username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"short": "The member's email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "github",
						"short": "The member's GitHub username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identity",
						"req": true,
						"short": "Represents an email address, a profile on networks like github and twitter, or a record in another system.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "included",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "linkedin",
						"short": "The member's LinkedIn username, without the in/ or pub/",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "member",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pronouns",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shipping_address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tag_list",
						"short": "Deprecated: Please use the tags attribute instead",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags",
						"short": "Replaces all tags for the member; comma-separated string or array",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tags_to_add",
						"short": "Adds tags to member; comma-separated string or array",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "teammate",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tshirt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twitter",
						"short": "The member's Twitter username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "member",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "member_slug",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{workspace_slug}/members/{member_slug}/identities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_slug",
									},
									map[string]any{
										"lit": "identities",
									},
								},
								"select": map[string]any{
									"$action": "identity",
									"exist": []any{
										"member_slug",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_slug}",
									"identities",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{workspace_slug}/members",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": map[string]any{
										"member": "`reqdata`",
									},
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "activities_count_max",
											"orig": "activities_count_max",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "activities_count_min",
											"orig": "activities_count_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "activity_type",
											"orig": "activity_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "affiliation",
											"orig": "affiliation",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "company",
											"orig": "company",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "identity",
											"orig": "identity",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "member_tag",
											"orig": "member_tag",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "orbit",
											"orig": "orbit",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "relative",
											"orig": "relative",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "title",
											"orig": "title",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/members",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "github",
											"orig": "github",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "source_host",
											"orig": "source_host",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "uid",
											"orig": "uid",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/members/find",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"lit": "find",
									},
								},
								"select": map[string]any{
									"$action": "find",
									"exist": []any{
										"email",
										"github",
										"source",
										"source_host",
										"uid",
										"username",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"find",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "organization_id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/organizations/{organization_id}/members",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "organization_id",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"item",
										"organization_id",
										"page",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"organizations",
									"{organization_id}",
									"members",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/members/{member_slug}",
								"rename": map[string]any{
									"param": map[string]any{
										"member_slug": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/{workspace_slug}/members/{member_slug}",
								"rename": map[string]any{
									"param": map[string]any{
										"member_slug": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "member_slug",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/{workspace_slug}/members/{member_slug}/identities",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_slug",
									},
									map[string]any{
										"lit": "identities",
									},
								},
								"select": map[string]any{
									"$action": "identity",
									"exist": []any{
										"member_slug",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_slug}",
									"identities",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/{workspace_slug}/members/{member_slug}",
								"rename": map[string]any{
									"param": map[string]any{
										"member_slug": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"member",
						},
						[]any{
							"organization",
						},
					},
				},
			},
			"note": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "body",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "included",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "note",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "member_slug",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{workspace_slug}/members/{member_slug}/notes",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_slug",
									},
									map[string]any{
										"lit": "notes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"member_slug",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_slug}",
									"notes",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "member_slug",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/members/{member_slug}/notes",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_slug",
									},
									map[string]any{
										"lit": "notes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"member_slug",
										"page",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_slug}",
									"notes",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "member_id",
											"orig": "member_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/{workspace_slug}/members/{member_slug}/notes/{id}",
								"rename": map[string]any{
									"param": map[string]any{
										"member_slug": "member_id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_id",
									},
									map[string]any{
										"lit": "notes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"member_id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"members",
									"{member_id}",
									"notes",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"member",
						},
					},
				},
			},
			"organization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "crm_uid",
						"short": "The unique identifier of the organization in your CRM.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crm_url",
						"req": true,
						"short": "A link to the organization profile in your CRM.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "deal_closed_date",
						"short": "The date the organization became a customer.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lifecycle_stage",
						"req": true,
						"short": "The current stage of the organization in the marketing or sales process.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "owner_email",
						"short": "The email of the team member who is in charge of the organization.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner_name",
						"short": "The name of the team member who is in charge of the organization.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price_plan",
						"short": "The pricing plan the organization is on.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"req": true,
						"short": "The name of the CRM you use for tracking the organization.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "organization",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/organizations",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "organizations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"direction",
										"item",
										"page",
										"query",
										"sort",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"organizations",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/organizations/{organization_id}",
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"organizations",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "organization_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/{workspace_slug}/organizations/{organization_id}",
								"rename": map[string]any{
									"param": map[string]any{
										"organization_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "organizations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"organizations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"report": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$OBJECT`",
					},
				},
				"name": "report",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "activity_type",
											"orig": "activity_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "property",
											"orig": "property",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "relative",
											"orig": "relative",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/reports",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "reports",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"activity_type",
										"end_date",
										"property",
										"relative",
										"start_date",
										"type",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"reports",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$OBJECT`",
					},
				},
				"name": "user",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"user",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "activity_tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "activity_types",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "event_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "links",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "member_tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "secret",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webhook",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{workspace_slug}/webhooks",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "webhooks",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"webhooks",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/webhooks/{id}",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"webhooks",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{workspace_slug}/webhooks",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "webhooks",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"webhooks",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/{workspace_slug}/webhooks/{id}",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"webhooks",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "workspace_slug",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/{workspace_slug}/webhooks/{id}",
								"segments": []any{
									map[string]any{
										"var": "workspace_slug",
									},
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"workspace_slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{workspace_slug}",
									"webhooks",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"workspace": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "included",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "workspace",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "workspace_slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "include_orbit_level_count",
											"orig": "include_orbit_level_count",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/workspaces/{workspace_slug}",
								"rename": map[string]any{
									"param": map[string]any{
										"workspace_slug": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "workspaces",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"include_orbit_level_count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"workspaces",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/workspaces",
								"segments": []any{
									map[string]any{
										"lit": "workspaces",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"workspaces",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
