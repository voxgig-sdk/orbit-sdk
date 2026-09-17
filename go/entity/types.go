// Typed models for the Orbit SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/orbit-sdk/go/core"
)

// Activity is the typed data model for the activity entity.
type Activity struct {
	Activity *any `json:"activity,omitempty"`
	ActivityType *string `json:"activity_type,omitempty"`
	ActivityTypeKey *string `json:"activity_type_key,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Identity map[string]any `json:"identity"`
	Included *[]any `json:"included,omitempty"`
	Key *string `json:"key,omitempty"`
	Link *string `json:"link,omitempty"`
	LinkText *string `json:"link_text,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	OccurredAt *string `json:"occurred_at,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Title string `json:"title"`
	Weight *string `json:"weight,omitempty"`
}

// ActivityLoadMatch is the typed request payload for Activity.LoadTyped.
type ActivityLoadMatch struct {
	WorkspaceSlug string `json:"workspace_slug"`
	ActivityType *string `json:"activity_type,omitempty"`
	Affiliation *string `json:"affiliation,omitempty"`
	City *string `json:"city,omitempty"`
	Company *string `json:"company,omitempty"`
	Country *string `json:"country,omitempty"`
	Direction *string `json:"direction,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Identity *string `json:"identity,omitempty"`
	Item *string `json:"item,omitempty"`
	MemberTag *string `json:"member_tag,omitempty"`
	Orbit *string `json:"orbit,omitempty"`
	Page *string `json:"page,omitempty"`
	Region *string `json:"region,omitempty"`
	Relative *string `json:"relative,omitempty"`
	Sort *string `json:"sort,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
	MemberSlug *string `json:"member_slug,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	Id *string `json:"id,omitempty"`
}

// ActivityCreateData is the typed request payload for Activity.CreateTyped.
type ActivityCreateData struct {
	MemberSlug *string `json:"member_slug,omitempty"`
	WorkspaceSlug string `json:"workspace_slug"`
	Activity *any `json:"activity,omitempty"`
	ActivityType *string `json:"activity_type,omitempty"`
	ActivityTypeKey *string `json:"activity_type_key,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Identity map[string]any `json:"identity"`
	Included *[]any `json:"included,omitempty"`
	Key *string `json:"key,omitempty"`
	Link *string `json:"link,omitempty"`
	LinkText *string `json:"link_text,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	OccurredAt *string `json:"occurred_at,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Title string `json:"title"`
	Weight *string `json:"weight,omitempty"`
}

// ActivityUpdateData is the typed request payload for Activity.UpdateTyped.
type ActivityUpdateData struct {
	Id string `json:"id"`
	MemberId string `json:"member_id"`
	WorkspaceSlug string `json:"workspace_slug"`
	Activity *any `json:"activity,omitempty"`
	ActivityType *string `json:"activity_type,omitempty"`
	ActivityTypeKey *string `json:"activity_type_key,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Description *string `json:"description,omitempty"`
	Identity *map[string]any `json:"identity,omitempty"`
	Included *[]any `json:"included,omitempty"`
	Key *string `json:"key,omitempty"`
	Link *string `json:"link,omitempty"`
	LinkText *string `json:"link_text,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	OccurredAt *string `json:"occurred_at,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Title *string `json:"title,omitempty"`
	Weight *string `json:"weight,omitempty"`
}

// ActivityRemoveMatch is the typed request payload for Activity.RemoveTyped.
type ActivityRemoveMatch struct {
	Id string `json:"id"`
	MemberId string `json:"member_id"`
	WorkspaceSlug string `json:"workspace_slug"`
}

// ActivityType is the typed data model for the activity_type entity.
type ActivityType struct {
	Data *[]any `json:"data,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
}

// ActivityTypeLoadMatch is the typed request payload for ActivityType.LoadTyped.
type ActivityTypeLoadMatch struct {
	WorkspaceSlug string `json:"workspace_slug"`
}

// Member is the typed data model for the member entity.
type Member struct {
	Bio *string `json:"bio,omitempty"`
	Birthday *string `json:"birthday,omitempty"`
	Company *string `json:"company,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Devto *string `json:"devto,omitempty"`
	Email *string `json:"email,omitempty"`
	Github *string `json:"github,omitempty"`
	Id *string `json:"id,omitempty"`
	Identity map[string]any `json:"identity"`
	Included *[]any `json:"included,omitempty"`
	Linkedin *string `json:"linkedin,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Location *string `json:"location,omitempty"`
	Member *map[string]any `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Pronouns *string `json:"pronouns,omitempty"`
	ShippingAddress *string `json:"shipping_address,omitempty"`
	Slug *string `json:"slug,omitempty"`
	TagList *string `json:"tag_list,omitempty"`
	Tags *string `json:"tags,omitempty"`
	TagsToAdd *string `json:"tags_to_add,omitempty"`
	Teammate *bool `json:"teammate,omitempty"`
	Title *string `json:"title,omitempty"`
	Tshirt *string `json:"tshirt,omitempty"`
	Twitter *string `json:"twitter,omitempty"`
	Url *string `json:"url,omitempty"`
}

// MemberLoadMatch is the typed request payload for Member.LoadTyped.
type MemberLoadMatch struct {
	WorkspaceSlug string `json:"workspace_slug"`
	ActivitiesCountMax *string `json:"activities_count_max,omitempty"`
	ActivitiesCountMin *string `json:"activities_count_min,omitempty"`
	ActivityType *string `json:"activity_type,omitempty"`
	Affiliation *string `json:"affiliation,omitempty"`
	City *string `json:"city,omitempty"`
	Company *string `json:"company,omitempty"`
	Country *string `json:"country,omitempty"`
	Direction *string `json:"direction,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Identity *string `json:"identity,omitempty"`
	Item *string `json:"item,omitempty"`
	MemberTag *string `json:"member_tag,omitempty"`
	Orbit *string `json:"orbit,omitempty"`
	Page *string `json:"page,omitempty"`
	Query *string `json:"query,omitempty"`
	Region *string `json:"region,omitempty"`
	Relative *string `json:"relative,omitempty"`
	Sort *string `json:"sort,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
	OrganizationId *string `json:"organization_id,omitempty"`
	Id *string `json:"id,omitempty"`
}

// MemberCreateData is the typed request payload for Member.CreateTyped.
type MemberCreateData struct {
	WorkspaceSlug string `json:"workspace_slug"`
	Bio *string `json:"bio,omitempty"`
	Birthday *string `json:"birthday,omitempty"`
	Company *string `json:"company,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Devto *string `json:"devto,omitempty"`
	Email *string `json:"email,omitempty"`
	Github *string `json:"github,omitempty"`
	Id *string `json:"id,omitempty"`
	Identity map[string]any `json:"identity"`
	Included *[]any `json:"included,omitempty"`
	Linkedin *string `json:"linkedin,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Location *string `json:"location,omitempty"`
	Member *map[string]any `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Pronouns *string `json:"pronouns,omitempty"`
	ShippingAddress *string `json:"shipping_address,omitempty"`
	Slug *string `json:"slug,omitempty"`
	TagList *string `json:"tag_list,omitempty"`
	Tags *string `json:"tags,omitempty"`
	TagsToAdd *string `json:"tags_to_add,omitempty"`
	Teammate *bool `json:"teammate,omitempty"`
	Title *string `json:"title,omitempty"`
	Tshirt *string `json:"tshirt,omitempty"`
	Twitter *string `json:"twitter,omitempty"`
	Url *string `json:"url,omitempty"`
}

// MemberUpdateData is the typed request payload for Member.UpdateTyped.
type MemberUpdateData struct {
	Id string `json:"id"`
	WorkspaceSlug string `json:"workspace_slug"`
	Bio *string `json:"bio,omitempty"`
	Birthday *string `json:"birthday,omitempty"`
	Company *string `json:"company,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Devto *string `json:"devto,omitempty"`
	Email *string `json:"email,omitempty"`
	Github *string `json:"github,omitempty"`
	Identity *map[string]any `json:"identity,omitempty"`
	Included *[]any `json:"included,omitempty"`
	Linkedin *string `json:"linkedin,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	Location *string `json:"location,omitempty"`
	Member *map[string]any `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Pronouns *string `json:"pronouns,omitempty"`
	ShippingAddress *string `json:"shipping_address,omitempty"`
	Slug *string `json:"slug,omitempty"`
	TagList *string `json:"tag_list,omitempty"`
	Tags *string `json:"tags,omitempty"`
	TagsToAdd *string `json:"tags_to_add,omitempty"`
	Teammate *bool `json:"teammate,omitempty"`
	Title *string `json:"title,omitempty"`
	Tshirt *string `json:"tshirt,omitempty"`
	Twitter *string `json:"twitter,omitempty"`
	Url *string `json:"url,omitempty"`
}

// MemberRemoveMatch is the typed request payload for Member.RemoveTyped.
type MemberRemoveMatch struct {
	Id string `json:"id"`
	WorkspaceSlug string `json:"workspace_slug"`
}

// Note is the typed data model for the note entity.
type Note struct {
	Body string `json:"body"`
	Data *[]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Included *[]any `json:"included,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
}

// NoteLoadMatch is the typed request payload for Note.LoadTyped.
type NoteLoadMatch struct {
	MemberSlug string `json:"member_slug"`
	WorkspaceSlug string `json:"workspace_slug"`
	Page *string `json:"page,omitempty"`
}

// NoteCreateData is the typed request payload for Note.CreateTyped.
type NoteCreateData struct {
	MemberSlug string `json:"member_slug"`
	WorkspaceSlug string `json:"workspace_slug"`
	Body string `json:"body"`
	Data *[]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Included *[]any `json:"included,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
}

// NoteUpdateData is the typed request payload for Note.UpdateTyped.
type NoteUpdateData struct {
	Id string `json:"id"`
	MemberId string `json:"member_id"`
	WorkspaceSlug string `json:"workspace_slug"`
	Body *string `json:"body,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Included *[]any `json:"included,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
}

// Organization is the typed data model for the organization entity.
type Organization struct {
	CrmUid *string `json:"crm_uid,omitempty"`
	CrmUrl string `json:"crm_url"`
	Data *[]any `json:"data,omitempty"`
	DealClosedDate *string `json:"deal_closed_date,omitempty"`
	Id *string `json:"id,omitempty"`
	LifecycleStage string `json:"lifecycle_stage"`
	Links *map[string]any `json:"links,omitempty"`
	OwnerEmail *string `json:"owner_email,omitempty"`
	OwnerName *string `json:"owner_name,omitempty"`
	PricePlan *string `json:"price_plan,omitempty"`
	Source string `json:"source"`
}

// OrganizationLoadMatch is the typed request payload for Organization.LoadTyped.
type OrganizationLoadMatch struct {
	WorkspaceSlug string `json:"workspace_slug"`
	Direction *string `json:"direction,omitempty"`
	Item *string `json:"item,omitempty"`
	Page *string `json:"page,omitempty"`
	Query *string `json:"query,omitempty"`
	Sort *string `json:"sort,omitempty"`
	Id *string `json:"id,omitempty"`
}

// OrganizationUpdateData is the typed request payload for Organization.UpdateTyped.
type OrganizationUpdateData struct {
	Id string `json:"id"`
	WorkspaceSlug string `json:"workspace_slug"`
	CrmUid *string `json:"crm_uid,omitempty"`
	CrmUrl *string `json:"crm_url,omitempty"`
	Data *[]any `json:"data,omitempty"`
	DealClosedDate *string `json:"deal_closed_date,omitempty"`
	LifecycleStage *string `json:"lifecycle_stage,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	OwnerEmail *string `json:"owner_email,omitempty"`
	OwnerName *string `json:"owner_name,omitempty"`
	PricePlan *string `json:"price_plan,omitempty"`
	Source *string `json:"source,omitempty"`
}

// Report is the typed data model for the report entity.
type Report struct {
	Data *map[string]any `json:"data,omitempty"`
}

// ReportLoadMatch is the typed request payload for Report.LoadTyped.
type ReportLoadMatch struct {
	WorkspaceSlug string `json:"workspace_slug"`
	ActivityType *string `json:"activity_type,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Property *string `json:"property,omitempty"`
	Relative *string `json:"relative,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Type *string `json:"type,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	Data *map[string]any `json:"data,omitempty"`
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
	ActivityTags *[]any `json:"activity_tags,omitempty"`
	ActivityTypes *[]any `json:"activity_types,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	EventType string `json:"event_type"`
	Id *string `json:"id,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	MemberTags *[]any `json:"member_tags,omitempty"`
	Name string `json:"name"`
	Secret *string `json:"secret,omitempty"`
	Url string `json:"url"`
}

// WebhookLoadMatch is the typed request payload for Webhook.LoadTyped.
type WebhookLoadMatch struct {
	Id *string `json:"id,omitempty"`
	WorkspaceSlug string `json:"workspace_slug"`
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
type WebhookCreateData struct {
	WorkspaceSlug string `json:"workspace_slug"`
	ActivityTags *[]any `json:"activity_tags,omitempty"`
	ActivityTypes *[]any `json:"activity_types,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	EventType string `json:"event_type"`
	Id *string `json:"id,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	MemberTags *[]any `json:"member_tags,omitempty"`
	Name string `json:"name"`
	Secret *string `json:"secret,omitempty"`
	Url string `json:"url"`
}

// WebhookUpdateData is the typed request payload for Webhook.UpdateTyped.
type WebhookUpdateData struct {
	Id string `json:"id"`
	WorkspaceSlug string `json:"workspace_slug"`
	ActivityTags *[]any `json:"activity_tags,omitempty"`
	ActivityTypes *[]any `json:"activity_types,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	EventType *string `json:"event_type,omitempty"`
	Links *map[string]any `json:"links,omitempty"`
	MemberTags *[]any `json:"member_tags,omitempty"`
	Name *string `json:"name,omitempty"`
	Secret *string `json:"secret,omitempty"`
	Url *string `json:"url,omitempty"`
}

// WebhookRemoveMatch is the typed request payload for Webhook.RemoveTyped.
type WebhookRemoveMatch struct {
	Id string `json:"id"`
	WorkspaceSlug string `json:"workspace_slug"`
}

// Workspace is the typed data model for the workspace entity.
type Workspace struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Included *[]any `json:"included,omitempty"`
}

// WorkspaceLoadMatch is the typed request payload for Workspace.LoadTyped.
type WorkspaceLoadMatch struct {
	Id string `json:"id"`
	IncludeOrbitLevelCount *bool `json:"include_orbit_level_count,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
