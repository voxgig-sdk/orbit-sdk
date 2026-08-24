-- Typed models for the Orbit SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Member
---@field bio? string
---@field company? string
---@field created_at? string
---@field id? string
---@field location? string
---@field love? number
---@field name? string
---@field orbit_level? number
---@field reach? number
---@field slug? string
---@field tags? table
---@field tags_to_add? string
---@field title? string

---@class MemberLoadMatch
---@field id string
---@field workspace string

---@class MemberListMatch
---@field workspace string

---@class MemberCreateData
---@field workspace string
---@field bio? string
---@field company? string
---@field created_at? string
---@field id? string
---@field location? string
---@field love? number
---@field name? string
---@field orbit_level? number
---@field reach? number
---@field slug? string
---@field tags? table
---@field tags_to_add? string
---@field title? string

---@class MemberUpdateData
---@field id string
---@field workspace string
---@field bio? string
---@field company? string
---@field created_at? string
---@field location? string
---@field love? number
---@field name? string
---@field orbit_level? number
---@field reach? number
---@field slug? string
---@field tags? table
---@field tags_to_add? string
---@field title? string

---@class MemberRemoveMatch
---@field id string
---@field workspace string

local M = {}

return M
