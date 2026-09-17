// Typed models for the Orbit SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Activity {
  activity?: any
  activity_type?: string
  activity_type_key?: string
  data?: any[]
  description?: string
  id?: string
  identity: Record<string, any>
  included?: any[]
  key?: string
  link?: string
  link_text?: string
  links?: Record<string, any>
  occurred_at?: string
  properties?: Record<string, any>
  title: string
  weight?: string
}

export interface ActivityLoadMatch {
  workspace_slug: string
  activity_type?: string
  affiliation?: string
  city?: string
  company?: string
  country?: string
  direction?: string
  end_date?: string
  identity?: string
  item?: string
  member_tag?: string
  orbit?: string
  page?: string
  region?: string
  relative?: string
  sort?: string
  start_date?: string
  title?: string
  type?: string
  member_slug?: string
  organization_id?: string
  id?: string
}

export interface ActivityCreateData {
  member_slug?: string
  workspace_slug: string
  activity?: any
  activity_type?: string
  activity_type_key?: string
  data?: any[]
  description?: string
  id?: string
  identity: Record<string, any>
  included?: any[]
  key?: string
  link?: string
  link_text?: string
  links?: Record<string, any>
  occurred_at?: string
  properties?: Record<string, any>
  title: string
  weight?: string
}

export interface ActivityUpdateData {
  id: string
  member_id: string
  workspace_slug: string
  activity?: any
  activity_type?: string
  activity_type_key?: string
  data?: any[]
  description?: string
  identity?: Record<string, any>
  included?: any[]
  key?: string
  link?: string
  link_text?: string
  links?: Record<string, any>
  occurred_at?: string
  properties?: Record<string, any>
  title?: string
  weight?: string
}

export interface ActivityRemoveMatch {
  id: string
  member_id: string
  workspace_slug: string
}

export interface ActivityType {
  data?: any[]
  links?: Record<string, any>
}

export interface ActivityTypeLoadMatch {
  workspace_slug: string
}

export interface Member {
  bio?: string
  birthday?: string
  company?: string
  data?: any[]
  devto?: string
  email?: string
  github?: string
  id?: string
  identity: Record<string, any>
  included?: any[]
  linkedin?: string
  links?: Record<string, any>
  location?: string
  member?: Record<string, any>
  name?: string
  pronouns?: string
  shipping_address?: string
  slug?: string
  tag_list?: string
  tags?: string
  tags_to_add?: string
  teammate?: boolean
  title?: string
  tshirt?: string
  twitter?: string
  url?: string
}

export interface MemberLoadMatch {
  workspace_slug: string
  activities_count_max?: string
  activities_count_min?: string
  activity_type?: string
  affiliation?: string
  city?: string
  company?: string
  country?: string
  direction?: string
  end_date?: string
  identity?: string
  item?: string
  member_tag?: string
  orbit?: string
  page?: string
  query?: string
  region?: string
  relative?: string
  sort?: string
  start_date?: string
  title?: string
  type?: string
  organization_id?: string
  id?: string

  // Selects a custom action instead of the plain load:
  //   'find'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MemberCreateData {
  workspace_slug: string
  bio?: string
  birthday?: string
  company?: string
  data?: any[]
  devto?: string
  email?: string
  github?: string
  id?: string
  identity: Record<string, any>
  included?: any[]
  linkedin?: string
  links?: Record<string, any>
  location?: string
  member?: Record<string, any>
  name?: string
  pronouns?: string
  shipping_address?: string
  slug?: string
  tag_list?: string
  tags?: string
  tags_to_add?: string
  teammate?: boolean
  title?: string
  tshirt?: string
  twitter?: string
  url?: string

  // Selects a custom action instead of the plain create:
  //   'identity'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MemberUpdateData {
  id: string
  workspace_slug: string
  bio?: string
  birthday?: string
  company?: string
  data?: any[]
  devto?: string
  email?: string
  github?: string
  identity?: Record<string, any>
  included?: any[]
  linkedin?: string
  links?: Record<string, any>
  location?: string
  member?: Record<string, any>
  name?: string
  pronouns?: string
  shipping_address?: string
  slug?: string
  tag_list?: string
  tags?: string
  tags_to_add?: string
  teammate?: boolean
  title?: string
  tshirt?: string
  twitter?: string
  url?: string
}

export interface MemberRemoveMatch {
  id: string
  workspace_slug: string

  // Selects a custom action instead of the plain remove:
  //   'identity'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Note {
  body: string
  data?: any[]
  id?: string
  included?: any[]
  links?: Record<string, any>
}

export interface NoteLoadMatch {
  member_slug: string
  workspace_slug: string
  page?: string
}

export interface NoteCreateData {
  member_slug: string
  workspace_slug: string
  body: string
  data?: any[]
  id?: string
  included?: any[]
  links?: Record<string, any>
}

export interface NoteUpdateData {
  id: string
  member_id: string
  workspace_slug: string
  body?: string
  data?: any[]
  included?: any[]
  links?: Record<string, any>
}

export interface Organization {
  crm_uid?: string
  crm_url: string
  data?: any[]
  deal_closed_date?: string
  id?: string
  lifecycle_stage: string
  links?: Record<string, any>
  owner_email?: string
  owner_name?: string
  price_plan?: string
  source: string
}

export interface OrganizationLoadMatch {
  workspace_slug: string
  direction?: string
  item?: string
  page?: string
  query?: string
  sort?: string
  id?: string
}

export interface OrganizationUpdateData {
  id: string
  workspace_slug: string
  crm_uid?: string
  crm_url?: string
  data?: any[]
  deal_closed_date?: string
  lifecycle_stage?: string
  links?: Record<string, any>
  owner_email?: string
  owner_name?: string
  price_plan?: string
  source?: string
}

export interface Report {
  data?: Record<string, any>
}

export interface ReportLoadMatch {
  workspace_slug: string
  activity_type?: string
  end_date?: string
  property?: string
  relative?: string
  start_date?: string
  type?: string
}

export interface User {
  data?: Record<string, any>
}

export interface UserLoadMatch {
  data?: Record<string, any>
}

export interface Webhook {
  activity_tags?: any[]
  activity_types?: any[]
  data?: Record<string, any>
  event_type: string
  id?: string
  links?: Record<string, any>
  member_tags?: any[]
  name: string
  secret?: string
  url: string
}

export interface WebhookLoadMatch {
  id?: string
  workspace_slug: string
}

export interface WebhookCreateData {
  workspace_slug: string
  activity_tags?: any[]
  activity_types?: any[]
  data?: Record<string, any>
  event_type: string
  id?: string
  links?: Record<string, any>
  member_tags?: any[]
  name: string
  secret?: string
  url: string
}

export interface WebhookUpdateData {
  id: string
  workspace_slug: string
  activity_tags?: any[]
  activity_types?: any[]
  data?: Record<string, any>
  event_type?: string
  links?: Record<string, any>
  member_tags?: any[]
  name?: string
  secret?: string
  url?: string
}

export interface WebhookRemoveMatch {
  id: string
  workspace_slug: string
}

export interface Workspace {
  data?: Record<string, any>
  id?: string
  included?: any[]
}

export interface WorkspaceLoadMatch {
  id: string
  include_orbit_level_count?: boolean
}

