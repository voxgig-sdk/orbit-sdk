<?php
declare(strict_types=1);

// Typed models for the Orbit SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Activity entity data model. */
class Activity
{
    public mixed $activity = null;
    public ?string $activity_type = null;
    public ?string $activity_type_key = null;
    public ?array $data = null;
    public ?string $description = null;
    public ?string $id = null;
    public array $identity;
    public ?array $included = null;
    public ?string $key = null;
    public ?string $link = null;
    public ?string $link_text = null;
    public ?array $links = null;
    public ?string $occurred_at = null;
    public ?array $properties = null;
    public string $title;
    public ?string $weight = null;
}

/** Request payload for Activity#load. */
class ActivityLoadMatch
{
    public string $workspace_slug;
    public ?string $activity_type = null;
    public ?string $affiliation = null;
    public ?string $city = null;
    public ?string $company = null;
    public ?string $country = null;
    public ?string $direction = null;
    public ?string $end_date = null;
    public ?string $identity = null;
    public ?string $item = null;
    public ?string $member_tag = null;
    public ?string $orbit = null;
    public ?string $page = null;
    public ?string $region = null;
    public ?string $relative = null;
    public ?string $sort = null;
    public ?string $start_date = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $member_slug = null;
    public ?string $organization_id = null;
    public ?string $id = null;
}

/** Request payload for Activity#create. */
class ActivityCreateData
{
    public ?string $member_slug = null;
    public string $workspace_slug;
    public mixed $activity = null;
    public ?string $activity_type = null;
    public ?string $activity_type_key = null;
    public ?array $data = null;
    public ?string $description = null;
    public ?string $id = null;
    public array $identity;
    public ?array $included = null;
    public ?string $key = null;
    public ?string $link = null;
    public ?string $link_text = null;
    public ?array $links = null;
    public ?string $occurred_at = null;
    public ?array $properties = null;
    public string $title;
    public ?string $weight = null;
}

/** Request payload for Activity#update. */
class ActivityUpdateData
{
    public string $id;
    public string $member_id;
    public string $workspace_slug;
    public mixed $activity = null;
    public ?string $activity_type = null;
    public ?string $activity_type_key = null;
    public ?array $data = null;
    public ?string $description = null;
    public ?array $identity = null;
    public ?array $included = null;
    public ?string $key = null;
    public ?string $link = null;
    public ?string $link_text = null;
    public ?array $links = null;
    public ?string $occurred_at = null;
    public ?array $properties = null;
    public ?string $title = null;
    public ?string $weight = null;
}

/** Request payload for Activity#remove. */
class ActivityRemoveMatch
{
    public string $id;
    public string $member_id;
    public string $workspace_slug;
}

/** ActivityType entity data model. */
class ActivityType
{
    public ?array $data = null;
    public ?array $links = null;
}

/** Request payload for ActivityType#load. */
class ActivityTypeLoadMatch
{
    public string $workspace_slug;
}

/** Member entity data model. */
class Member
{
    public ?string $bio = null;
    public ?string $birthday = null;
    public ?string $company = null;
    public ?array $data = null;
    public ?string $devto = null;
    public ?string $email = null;
    public ?string $github = null;
    public ?string $id = null;
    public array $identity;
    public ?array $included = null;
    public ?string $linkedin = null;
    public ?array $links = null;
    public ?string $location = null;
    public ?array $member = null;
    public ?string $name = null;
    public ?string $pronouns = null;
    public ?string $shipping_address = null;
    public ?string $slug = null;
    public ?string $tag_list = null;
    public ?string $tags = null;
    public ?string $tags_to_add = null;
    public ?bool $teammate = null;
    public ?string $title = null;
    public ?string $tshirt = null;
    public ?string $twitter = null;
    public ?string $url = null;
}

/** Request payload for Member#load. */
class MemberLoadMatch
{
    public string $workspace_slug;
    public ?string $activities_count_max = null;
    public ?string $activities_count_min = null;
    public ?string $activity_type = null;
    public ?string $affiliation = null;
    public ?string $city = null;
    public ?string $company = null;
    public ?string $country = null;
    public ?string $direction = null;
    public ?string $end_date = null;
    public ?string $identity = null;
    public ?string $item = null;
    public ?string $member_tag = null;
    public ?string $orbit = null;
    public ?string $page = null;
    public ?string $query = null;
    public ?string $region = null;
    public ?string $relative = null;
    public ?string $sort = null;
    public ?string $start_date = null;
    public ?string $title = null;
    public ?string $type = null;
    public ?string $organization_id = null;
    public ?string $id = null;
}

/** Request payload for Member#create. */
class MemberCreateData
{
    public string $workspace_slug;
    public ?string $bio = null;
    public ?string $birthday = null;
    public ?string $company = null;
    public ?array $data = null;
    public ?string $devto = null;
    public ?string $email = null;
    public ?string $github = null;
    public ?string $id = null;
    public array $identity;
    public ?array $included = null;
    public ?string $linkedin = null;
    public ?array $links = null;
    public ?string $location = null;
    public ?array $member = null;
    public ?string $name = null;
    public ?string $pronouns = null;
    public ?string $shipping_address = null;
    public ?string $slug = null;
    public ?string $tag_list = null;
    public ?string $tags = null;
    public ?string $tags_to_add = null;
    public ?bool $teammate = null;
    public ?string $title = null;
    public ?string $tshirt = null;
    public ?string $twitter = null;
    public ?string $url = null;
}

/** Request payload for Member#update. */
class MemberUpdateData
{
    public string $id;
    public string $workspace_slug;
    public ?string $bio = null;
    public ?string $birthday = null;
    public ?string $company = null;
    public ?array $data = null;
    public ?string $devto = null;
    public ?string $email = null;
    public ?string $github = null;
    public ?array $identity = null;
    public ?array $included = null;
    public ?string $linkedin = null;
    public ?array $links = null;
    public ?string $location = null;
    public ?array $member = null;
    public ?string $name = null;
    public ?string $pronouns = null;
    public ?string $shipping_address = null;
    public ?string $slug = null;
    public ?string $tag_list = null;
    public ?string $tags = null;
    public ?string $tags_to_add = null;
    public ?bool $teammate = null;
    public ?string $title = null;
    public ?string $tshirt = null;
    public ?string $twitter = null;
    public ?string $url = null;
}

/** Request payload for Member#remove. */
class MemberRemoveMatch
{
    public string $id;
    public string $workspace_slug;
}

/** Note entity data model. */
class Note
{
    public string $body;
    public ?array $data = null;
    public ?string $id = null;
    public ?array $included = null;
    public ?array $links = null;
}

/** Request payload for Note#load. */
class NoteLoadMatch
{
    public string $member_slug;
    public string $workspace_slug;
    public ?string $page = null;
}

/** Request payload for Note#create. */
class NoteCreateData
{
    public string $member_slug;
    public string $workspace_slug;
    public string $body;
    public ?array $data = null;
    public ?string $id = null;
    public ?array $included = null;
    public ?array $links = null;
}

/** Request payload for Note#update. */
class NoteUpdateData
{
    public string $id;
    public string $member_id;
    public string $workspace_slug;
    public ?string $body = null;
    public ?array $data = null;
    public ?array $included = null;
    public ?array $links = null;
}

/** Organization entity data model. */
class Organization
{
    public ?string $crm_uid = null;
    public string $crm_url;
    public ?array $data = null;
    public ?string $deal_closed_date = null;
    public ?string $id = null;
    public string $lifecycle_stage;
    public ?array $links = null;
    public ?string $owner_email = null;
    public ?string $owner_name = null;
    public ?string $price_plan = null;
    public string $source;
}

/** Request payload for Organization#load. */
class OrganizationLoadMatch
{
    public string $workspace_slug;
    public ?string $direction = null;
    public ?string $item = null;
    public ?string $page = null;
    public ?string $query = null;
    public ?string $sort = null;
    public ?string $id = null;
}

/** Request payload for Organization#update. */
class OrganizationUpdateData
{
    public string $id;
    public string $workspace_slug;
    public ?string $crm_uid = null;
    public ?string $crm_url = null;
    public ?array $data = null;
    public ?string $deal_closed_date = null;
    public ?string $lifecycle_stage = null;
    public ?array $links = null;
    public ?string $owner_email = null;
    public ?string $owner_name = null;
    public ?string $price_plan = null;
    public ?string $source = null;
}

/** Report entity data model. */
class Report
{
    public ?array $data = null;
}

/** Request payload for Report#load. */
class ReportLoadMatch
{
    public string $workspace_slug;
    public ?string $activity_type = null;
    public ?string $end_date = null;
    public ?string $property = null;
    public ?string $relative = null;
    public ?string $start_date = null;
    public ?string $type = null;
}

/** User entity data model. */
class User
{
    public ?array $data = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public ?array $data = null;
}

/** Webhook entity data model. */
class Webhook
{
    public ?array $activity_tags = null;
    public ?array $activity_types = null;
    public ?array $data = null;
    public string $event_type;
    public ?string $id = null;
    public ?array $links = null;
    public ?array $member_tags = null;
    public string $name;
    public ?string $secret = null;
    public string $url;
}

/** Request payload for Webhook#load. */
class WebhookLoadMatch
{
    public ?string $id = null;
    public string $workspace_slug;
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
    public string $workspace_slug;
    public ?array $activity_tags = null;
    public ?array $activity_types = null;
    public ?array $data = null;
    public string $event_type;
    public ?string $id = null;
    public ?array $links = null;
    public ?array $member_tags = null;
    public string $name;
    public ?string $secret = null;
    public string $url;
}

/** Request payload for Webhook#update. */
class WebhookUpdateData
{
    public string $id;
    public string $workspace_slug;
    public ?array $activity_tags = null;
    public ?array $activity_types = null;
    public ?array $data = null;
    public ?string $event_type = null;
    public ?array $links = null;
    public ?array $member_tags = null;
    public ?string $name = null;
    public ?string $secret = null;
    public ?string $url = null;
}

/** Request payload for Webhook#remove. */
class WebhookRemoveMatch
{
    public string $id;
    public string $workspace_slug;
}

/** Workspace entity data model. */
class Workspace
{
    public ?array $data = null;
    public ?string $id = null;
    public ?array $included = null;
}

/** Request payload for Workspace#load. */
class WorkspaceLoadMatch
{
    public string $id;
    public ?bool $include_orbit_level_count = null;
}

