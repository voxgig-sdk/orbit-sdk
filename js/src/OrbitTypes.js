// Typed models for the Orbit SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Member
 * @property {string} [bio]
 * @property {string} [company]
 * @property {string} [created_at]
 * @property {string} [id]
 * @property {string} [location]
 * @property {number} [love]
 * @property {string} [name]
 * @property {number} [orbit_level]
 * @property {number} [reach]
 * @property {string} [slug]
 * @property {Array} [tags]
 * @property {string} [tags_to_add]
 * @property {string} [title]
 */

/**
 * @typedef {Object} MemberLoadMatch
 * @property {string} id
 * @property {string} workspace
 */

/**
 * @typedef {Object} MemberListMatch
 * @property {string} workspace
 */

/**
 * @typedef {Object} MemberCreateData
 * @property {string} workspace
 * @property {string} [bio]
 * @property {string} [company]
 * @property {string} [created_at]
 * @property {string} [id]
 * @property {string} [location]
 * @property {number} [love]
 * @property {string} [name]
 * @property {number} [orbit_level]
 * @property {number} [reach]
 * @property {string} [slug]
 * @property {Array} [tags]
 * @property {string} [tags_to_add]
 * @property {string} [title]
 */

/**
 * @typedef {Object} MemberUpdateData
 * @property {string} id
 * @property {string} workspace
 * @property {string} [bio]
 * @property {string} [company]
 * @property {string} [created_at]
 * @property {string} [location]
 * @property {number} [love]
 * @property {string} [name]
 * @property {number} [orbit_level]
 * @property {number} [reach]
 * @property {string} [slug]
 * @property {Array} [tags]
 * @property {string} [tags_to_add]
 * @property {string} [title]
 */

/**
 * @typedef {Object} MemberRemoveMatch
 * @property {string} id
 * @property {string} workspace
 */

