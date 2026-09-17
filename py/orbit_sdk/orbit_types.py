# Typed models for the Orbit SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ActivityRequired(TypedDict):
    identity: dict
    title: str


class Activity(ActivityRequired, total=False):
    activity: Any
    activity_type: str
    activity_type_key: str
    data: list
    description: str
    id: str
    included: list
    key: str
    link: str
    link_text: str
    links: dict
    occurred_at: str
    properties: dict
    weight: str


class ActivityLoadMatchRequired(TypedDict):
    workspace_slug: str


class ActivityLoadMatch(ActivityLoadMatchRequired, total=False):
    activity_type: str
    affiliation: str
    city: str
    company: str
    country: str
    direction: str
    end_date: str
    identity: str
    item: str
    member_tag: str
    orbit: str
    page: str
    region: str
    relative: str
    sort: str
    start_date: str
    title: str
    type: str
    member_slug: str
    organization_id: str
    id: str


class ActivityCreateDataRequired(TypedDict):
    workspace_slug: str
    identity: dict
    title: str


class ActivityCreateData(ActivityCreateDataRequired, total=False):
    member_slug: str
    activity: Any
    activity_type: str
    activity_type_key: str
    data: list
    description: str
    id: str
    included: list
    key: str
    link: str
    link_text: str
    links: dict
    occurred_at: str
    properties: dict
    weight: str


class ActivityUpdateDataRequired(TypedDict):
    id: str
    member_id: str
    workspace_slug: str


class ActivityUpdateData(ActivityUpdateDataRequired, total=False):
    activity: Any
    activity_type: str
    activity_type_key: str
    data: list
    description: str
    identity: dict
    included: list
    key: str
    link: str
    link_text: str
    links: dict
    occurred_at: str
    properties: dict
    title: str
    weight: str


class ActivityRemoveMatch(TypedDict):
    id: str
    member_id: str
    workspace_slug: str


class ActivityType(TypedDict, total=False):
    data: list
    links: dict


class ActivityTypeLoadMatch(TypedDict):
    workspace_slug: str


class MemberRequired(TypedDict):
    identity: dict


class Member(MemberRequired, total=False):
    bio: str
    birthday: str
    company: str
    data: list
    devto: str
    email: str
    github: str
    id: str
    included: list
    linkedin: str
    links: dict
    location: str
    member: dict
    name: str
    pronouns: str
    shipping_address: str
    slug: str
    tag_list: str
    tags: str
    tags_to_add: str
    teammate: bool
    title: str
    tshirt: str
    twitter: str
    url: str


class MemberLoadMatchRequired(TypedDict):
    workspace_slug: str


class MemberLoadMatch(MemberLoadMatchRequired, total=False):
    activities_count_max: str
    activities_count_min: str
    activity_type: str
    affiliation: str
    city: str
    company: str
    country: str
    direction: str
    end_date: str
    identity: str
    item: str
    member_tag: str
    orbit: str
    page: str
    query: str
    region: str
    relative: str
    sort: str
    start_date: str
    title: str
    type: str
    organization_id: str
    id: str


class MemberCreateDataRequired(TypedDict):
    workspace_slug: str
    identity: dict


class MemberCreateData(MemberCreateDataRequired, total=False):
    bio: str
    birthday: str
    company: str
    data: list
    devto: str
    email: str
    github: str
    id: str
    included: list
    linkedin: str
    links: dict
    location: str
    member: dict
    name: str
    pronouns: str
    shipping_address: str
    slug: str
    tag_list: str
    tags: str
    tags_to_add: str
    teammate: bool
    title: str
    tshirt: str
    twitter: str
    url: str


class MemberUpdateDataRequired(TypedDict):
    id: str
    workspace_slug: str


class MemberUpdateData(MemberUpdateDataRequired, total=False):
    bio: str
    birthday: str
    company: str
    data: list
    devto: str
    email: str
    github: str
    identity: dict
    included: list
    linkedin: str
    links: dict
    location: str
    member: dict
    name: str
    pronouns: str
    shipping_address: str
    slug: str
    tag_list: str
    tags: str
    tags_to_add: str
    teammate: bool
    title: str
    tshirt: str
    twitter: str
    url: str


class MemberRemoveMatch(TypedDict):
    id: str
    workspace_slug: str


class NoteRequired(TypedDict):
    body: str


class Note(NoteRequired, total=False):
    data: list
    id: str
    included: list
    links: dict


class NoteLoadMatchRequired(TypedDict):
    member_slug: str
    workspace_slug: str


class NoteLoadMatch(NoteLoadMatchRequired, total=False):
    page: str


class NoteCreateDataRequired(TypedDict):
    member_slug: str
    workspace_slug: str
    body: str


class NoteCreateData(NoteCreateDataRequired, total=False):
    data: list
    id: str
    included: list
    links: dict


class NoteUpdateDataRequired(TypedDict):
    id: str
    member_id: str
    workspace_slug: str


class NoteUpdateData(NoteUpdateDataRequired, total=False):
    body: str
    data: list
    included: list
    links: dict


class OrganizationRequired(TypedDict):
    crm_url: str
    lifecycle_stage: str
    source: str


class Organization(OrganizationRequired, total=False):
    crm_uid: str
    data: list
    deal_closed_date: str
    id: str
    links: dict
    owner_email: str
    owner_name: str
    price_plan: str


class OrganizationLoadMatchRequired(TypedDict):
    workspace_slug: str


class OrganizationLoadMatch(OrganizationLoadMatchRequired, total=False):
    direction: str
    item: str
    page: str
    query: str
    sort: str
    id: str


class OrganizationUpdateDataRequired(TypedDict):
    id: str
    workspace_slug: str


class OrganizationUpdateData(OrganizationUpdateDataRequired, total=False):
    crm_uid: str
    crm_url: str
    data: list
    deal_closed_date: str
    lifecycle_stage: str
    links: dict
    owner_email: str
    owner_name: str
    price_plan: str
    source: str


class Report(TypedDict, total=False):
    data: dict


class ReportLoadMatchRequired(TypedDict):
    workspace_slug: str


class ReportLoadMatch(ReportLoadMatchRequired, total=False):
    activity_type: str
    end_date: str
    property: str
    relative: str
    start_date: str
    type: str


class User(TypedDict, total=False):
    data: dict


class UserLoadMatch(TypedDict, total=False):
    data: dict


class WebhookRequired(TypedDict):
    event_type: str
    name: str
    url: str


class Webhook(WebhookRequired, total=False):
    activity_tags: list
    activity_types: list
    data: dict
    id: str
    links: dict
    member_tags: list
    secret: str


class WebhookLoadMatchRequired(TypedDict):
    workspace_slug: str


class WebhookLoadMatch(WebhookLoadMatchRequired, total=False):
    id: str


class WebhookCreateDataRequired(TypedDict):
    workspace_slug: str
    event_type: str
    name: str
    url: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    activity_tags: list
    activity_types: list
    data: dict
    id: str
    links: dict
    member_tags: list
    secret: str


class WebhookUpdateDataRequired(TypedDict):
    id: str
    workspace_slug: str


class WebhookUpdateData(WebhookUpdateDataRequired, total=False):
    activity_tags: list
    activity_types: list
    data: dict
    event_type: str
    links: dict
    member_tags: list
    name: str
    secret: str
    url: str


class WebhookRemoveMatch(TypedDict):
    id: str
    workspace_slug: str


class Workspace(TypedDict, total=False):
    data: dict
    id: str
    included: list


class WorkspaceLoadMatchRequired(TypedDict):
    id: str


class WorkspaceLoadMatch(WorkspaceLoadMatchRequired, total=False):
    include_orbit_level_count: bool
