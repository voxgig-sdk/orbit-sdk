// Typed models for the Orbit SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Member {
  bio?: string
  company?: string
  created_at?: string
  id?: string
  location?: string
  love?: number
  name?: string
  orbit_level?: number
  reach?: number
  slug?: string
  tags?: any[]
  tags_to_add?: string
  title?: string
}

export interface MemberLoadMatch {
  id: string
  workspace: string
}

export interface MemberListMatch {
  workspace: string
}

export interface MemberCreateData {
  workspace: string
  bio?: string
  company?: string
  created_at?: string
  id?: string
  location?: string
  love?: number
  name?: string
  orbit_level?: number
  reach?: number
  slug?: string
  tags?: any[]
  tags_to_add?: string
  title?: string
}

export interface MemberUpdateData {
  id: string
  workspace: string
  bio?: string
  company?: string
  created_at?: string
  location?: string
  love?: number
  name?: string
  orbit_level?: number
  reach?: number
  slug?: string
  tags?: any[]
  tags_to_add?: string
  title?: string
}

export interface MemberRemoveMatch {
  id: string
  workspace: string
}

