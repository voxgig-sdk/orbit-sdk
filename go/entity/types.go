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

// Member is the typed data model for the member entity.
type Member struct {
	Bio *string `json:"bio,omitempty"`
	Company *string `json:"company,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Love *float64 `json:"love,omitempty"`
	Name *string `json:"name,omitempty"`
	OrbitLevel *int `json:"orbit_level,omitempty"`
	Reach *int `json:"reach,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	TagsToAdd *string `json:"tags_to_add,omitempty"`
	Title *string `json:"title,omitempty"`
}

// MemberLoadMatch is the typed request payload for Member.LoadTyped.
type MemberLoadMatch struct {
	Id string `json:"id"`
	Workspace string `json:"workspace"`
}

// MemberListMatch is the typed request payload for Member.ListTyped.
type MemberListMatch struct {
	Workspace string `json:"workspace"`
}

// MemberCreateData is the typed request payload for Member.CreateTyped.
type MemberCreateData struct {
	Workspace string `json:"workspace"`
	Bio *string `json:"bio,omitempty"`
	Company *string `json:"company,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Love *float64 `json:"love,omitempty"`
	Name *string `json:"name,omitempty"`
	OrbitLevel *int `json:"orbit_level,omitempty"`
	Reach *int `json:"reach,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	TagsToAdd *string `json:"tags_to_add,omitempty"`
	Title *string `json:"title,omitempty"`
}

// MemberUpdateData is the typed request payload for Member.UpdateTyped.
type MemberUpdateData struct {
	Id string `json:"id"`
	Workspace string `json:"workspace"`
	Bio *string `json:"bio,omitempty"`
	Company *string `json:"company,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Location *string `json:"location,omitempty"`
	Love *float64 `json:"love,omitempty"`
	Name *string `json:"name,omitempty"`
	OrbitLevel *int `json:"orbit_level,omitempty"`
	Reach *int `json:"reach,omitempty"`
	Slug *string `json:"slug,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	TagsToAdd *string `json:"tags_to_add,omitempty"`
	Title *string `json:"title,omitempty"`
}

// MemberRemoveMatch is the typed request payload for Member.RemoveTyped.
type MemberRemoveMatch struct {
	Id string `json:"id"`
	Workspace string `json:"workspace"`
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
