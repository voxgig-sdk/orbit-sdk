// Typed models for the Orbit SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Activity
 * @property {*} [activity]
 * @property {string} [activity_type]
 * @property {string} [activity_type_key]
 * @property {Array} [data]
 * @property {string} [description]
 * @property {string} [id]
 * @property {Object} identity
 * @property {Array} [included]
 * @property {string} [key]
 * @property {string} [link]
 * @property {string} [link_text]
 * @property {Object} [links]
 * @property {string} [occurred_at]
 * @property {Object} [properties]
 * @property {string} title
 * @property {string} [weight]
 */

/**
 * @typedef {Object} ActivityLoadMatch
 * @property {string} workspace_slug
 * @property {string} [activity_type]
 * @property {string} [affiliation]
 * @property {string} [city]
 * @property {string} [company]
 * @property {string} [country]
 * @property {string} [direction]
 * @property {string} [end_date]
 * @property {string} [identity]
 * @property {string} [item]
 * @property {string} [member_tag]
 * @property {string} [orbit]
 * @property {string} [page]
 * @property {string} [region]
 * @property {string} [relative]
 * @property {string} [sort]
 * @property {string} [start_date]
 * @property {string} [title]
 * @property {string} [type]
 * @property {string} [member_slug]
 * @property {string} [organization_id]
 * @property {string} [id]
 */

/**
 * @typedef {Object} ActivityCreateData
 * @property {string} [member_slug]
 * @property {string} workspace_slug
 * @property {*} [activity]
 * @property {string} [activity_type]
 * @property {string} [activity_type_key]
 * @property {Array} [data]
 * @property {string} [description]
 * @property {string} [id]
 * @property {Object} identity
 * @property {Array} [included]
 * @property {string} [key]
 * @property {string} [link]
 * @property {string} [link_text]
 * @property {Object} [links]
 * @property {string} [occurred_at]
 * @property {Object} [properties]
 * @property {string} title
 * @property {string} [weight]
 */

/**
 * @typedef {Object} ActivityUpdateData
 * @property {string} id
 * @property {string} member_id
 * @property {string} workspace_slug
 * @property {*} [activity]
 * @property {string} [activity_type]
 * @property {string} [activity_type_key]
 * @property {Array} [data]
 * @property {string} [description]
 * @property {Object} [identity]
 * @property {Array} [included]
 * @property {string} [key]
 * @property {string} [link]
 * @property {string} [link_text]
 * @property {Object} [links]
 * @property {string} [occurred_at]
 * @property {Object} [properties]
 * @property {string} [title]
 * @property {string} [weight]
 */

/**
 * @typedef {Object} ActivityRemoveMatch
 * @property {string} id
 * @property {string} member_id
 * @property {string} workspace_slug
 */

/**
 * @typedef {Object} ActivityType
 * @property {Array} [data]
 * @property {Object} [links]
 */

/**
 * @typedef {Object} ActivityTypeLoadMatch
 * @property {string} workspace_slug
 */

/**
 * @typedef {Object} Member
 * @property {string} [bio]
 * @property {string} [birthday]
 * @property {string} [company]
 * @property {Array} [data]
 * @property {string} [devto]
 * @property {string} [email]
 * @property {string} [github]
 * @property {string} [id]
 * @property {Object} identity
 * @property {Array} [included]
 * @property {string} [linkedin]
 * @property {Object} [links]
 * @property {string} [location]
 * @property {Object} [member]
 * @property {string} [name]
 * @property {string} [pronouns]
 * @property {string} [shipping_address]
 * @property {string} [slug]
 * @property {string} [tag_list]
 * @property {string} [tags]
 * @property {string} [tags_to_add]
 * @property {boolean} [teammate]
 * @property {string} [title]
 * @property {string} [tshirt]
 * @property {string} [twitter]
 * @property {string} [url]
 */

/**
 * @typedef {Object} MemberLoadMatch
 * @property {string} workspace_slug
 * @property {string} [activities_count_max]
 * @property {string} [activities_count_min]
 * @property {string} [activity_type]
 * @property {string} [affiliation]
 * @property {string} [city]
 * @property {string} [company]
 * @property {string} [country]
 * @property {string} [direction]
 * @property {string} [end_date]
 * @property {string} [identity]
 * @property {string} [item]
 * @property {string} [member_tag]
 * @property {string} [orbit]
 * @property {string} [page]
 * @property {string} [query]
 * @property {string} [region]
 * @property {string} [relative]
 * @property {string} [sort]
 * @property {string} [start_date]
 * @property {string} [title]
 * @property {string} [type]
 * @property {string} [organization_id]
 * @property {string} [id]
 */

/**
 * @typedef {Object} MemberCreateData
 * @property {string} workspace_slug
 * @property {string} [bio]
 * @property {string} [birthday]
 * @property {string} [company]
 * @property {Array} [data]
 * @property {string} [devto]
 * @property {string} [email]
 * @property {string} [github]
 * @property {string} [id]
 * @property {Object} identity
 * @property {Array} [included]
 * @property {string} [linkedin]
 * @property {Object} [links]
 * @property {string} [location]
 * @property {Object} [member]
 * @property {string} [name]
 * @property {string} [pronouns]
 * @property {string} [shipping_address]
 * @property {string} [slug]
 * @property {string} [tag_list]
 * @property {string} [tags]
 * @property {string} [tags_to_add]
 * @property {boolean} [teammate]
 * @property {string} [title]
 * @property {string} [tshirt]
 * @property {string} [twitter]
 * @property {string} [url]
 */

/**
 * @typedef {Object} MemberUpdateData
 * @property {string} id
 * @property {string} workspace_slug
 * @property {string} [bio]
 * @property {string} [birthday]
 * @property {string} [company]
 * @property {Array} [data]
 * @property {string} [devto]
 * @property {string} [email]
 * @property {string} [github]
 * @property {Object} [identity]
 * @property {Array} [included]
 * @property {string} [linkedin]
 * @property {Object} [links]
 * @property {string} [location]
 * @property {Object} [member]
 * @property {string} [name]
 * @property {string} [pronouns]
 * @property {string} [shipping_address]
 * @property {string} [slug]
 * @property {string} [tag_list]
 * @property {string} [tags]
 * @property {string} [tags_to_add]
 * @property {boolean} [teammate]
 * @property {string} [title]
 * @property {string} [tshirt]
 * @property {string} [twitter]
 * @property {string} [url]
 */

/**
 * @typedef {Object} MemberRemoveMatch
 * @property {string} id
 * @property {string} workspace_slug
 */

/**
 * @typedef {Object} Note
 * @property {string} body
 * @property {Array} [data]
 * @property {string} [id]
 * @property {Array} [included]
 * @property {Object} [links]
 */

/**
 * @typedef {Object} NoteLoadMatch
 * @property {string} member_slug
 * @property {string} workspace_slug
 * @property {string} [page]
 */

/**
 * @typedef {Object} NoteCreateData
 * @property {string} member_slug
 * @property {string} workspace_slug
 * @property {string} body
 * @property {Array} [data]
 * @property {string} [id]
 * @property {Array} [included]
 * @property {Object} [links]
 */

/**
 * @typedef {Object} NoteUpdateData
 * @property {string} id
 * @property {string} member_id
 * @property {string} workspace_slug
 * @property {string} [body]
 * @property {Array} [data]
 * @property {Array} [included]
 * @property {Object} [links]
 */

/**
 * @typedef {Object} Organization
 * @property {string} [crm_uid]
 * @property {string} crm_url
 * @property {Array} [data]
 * @property {string} [deal_closed_date]
 * @property {string} [id]
 * @property {string} lifecycle_stage
 * @property {Object} [links]
 * @property {string} [owner_email]
 * @property {string} [owner_name]
 * @property {string} [price_plan]
 * @property {string} source
 */

/**
 * @typedef {Object} OrganizationLoadMatch
 * @property {string} workspace_slug
 * @property {string} [direction]
 * @property {string} [item]
 * @property {string} [page]
 * @property {string} [query]
 * @property {string} [sort]
 * @property {string} [id]
 */

/**
 * @typedef {Object} OrganizationUpdateData
 * @property {string} id
 * @property {string} workspace_slug
 * @property {string} [crm_uid]
 * @property {string} [crm_url]
 * @property {Array} [data]
 * @property {string} [deal_closed_date]
 * @property {string} [lifecycle_stage]
 * @property {Object} [links]
 * @property {string} [owner_email]
 * @property {string} [owner_name]
 * @property {string} [price_plan]
 * @property {string} [source]
 */

/**
 * @typedef {Object} Report
 * @property {Object} [data]
 */

/**
 * @typedef {Object} ReportLoadMatch
 * @property {string} workspace_slug
 * @property {string} [activity_type]
 * @property {string} [end_date]
 * @property {string} [property]
 * @property {string} [relative]
 * @property {string} [start_date]
 * @property {string} [type]
 */

/**
 * @typedef {Object} User
 * @property {Object} [data]
 */

/**
 * @typedef {Object} UserLoadMatch
 * @property {Object} [data]
 */

/**
 * @typedef {Object} Webhook
 * @property {Array} [activity_tags]
 * @property {Array} [activity_types]
 * @property {Object} [data]
 * @property {string} event_type
 * @property {string} [id]
 * @property {Object} [links]
 * @property {Array} [member_tags]
 * @property {string} name
 * @property {string} [secret]
 * @property {string} url
 */

/**
 * @typedef {Object} WebhookLoadMatch
 * @property {string} [id]
 * @property {string} workspace_slug
 */

/**
 * @typedef {Object} WebhookCreateData
 * @property {string} workspace_slug
 * @property {Array} [activity_tags]
 * @property {Array} [activity_types]
 * @property {Object} [data]
 * @property {string} event_type
 * @property {string} [id]
 * @property {Object} [links]
 * @property {Array} [member_tags]
 * @property {string} name
 * @property {string} [secret]
 * @property {string} url
 */

/**
 * @typedef {Object} WebhookUpdateData
 * @property {string} id
 * @property {string} workspace_slug
 * @property {Array} [activity_tags]
 * @property {Array} [activity_types]
 * @property {Object} [data]
 * @property {string} [event_type]
 * @property {Object} [links]
 * @property {Array} [member_tags]
 * @property {string} [name]
 * @property {string} [secret]
 * @property {string} [url]
 */

/**
 * @typedef {Object} WebhookRemoveMatch
 * @property {string} id
 * @property {string} workspace_slug
 */

/**
 * @typedef {Object} Workspace
 * @property {Object} [data]
 * @property {string} [id]
 * @property {Array} [included]
 */

/**
 * @typedef {Object} WorkspaceLoadMatch
 * @property {string} id
 * @property {boolean} [include_orbit_level_count]
 */

