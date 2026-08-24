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

/** Member entity data model. */
class Member
{
    public ?string $bio = null;
    public ?string $company = null;
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?float $love = null;
    public ?string $name = null;
    public ?int $orbit_level = null;
    public ?int $reach = null;
    public ?string $slug = null;
    public ?array $tags = null;
    public ?string $tags_to_add = null;
    public ?string $title = null;
}

/** Request payload for Member#load. */
class MemberLoadMatch
{
    public string $id;
    public string $workspace;
}

/** Request payload for Member#list. */
class MemberListMatch
{
    public string $workspace;
}

/** Request payload for Member#create. */
class MemberCreateData
{
    public string $workspace;
    public ?string $bio = null;
    public ?string $company = null;
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $location = null;
    public ?float $love = null;
    public ?string $name = null;
    public ?int $orbit_level = null;
    public ?int $reach = null;
    public ?string $slug = null;
    public ?array $tags = null;
    public ?string $tags_to_add = null;
    public ?string $title = null;
}

/** Request payload for Member#update. */
class MemberUpdateData
{
    public string $id;
    public string $workspace;
    public ?string $bio = null;
    public ?string $company = null;
    public ?string $created_at = null;
    public ?string $location = null;
    public ?float $love = null;
    public ?string $name = null;
    public ?int $orbit_level = null;
    public ?int $reach = null;
    public ?string $slug = null;
    public ?array $tags = null;
    public ?string $tags_to_add = null;
    public ?string $title = null;
}

/** Request payload for Member#remove. */
class MemberRemoveMatch
{
    public string $id;
    public string $workspace;
}

