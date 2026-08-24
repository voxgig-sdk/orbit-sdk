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


class Member(TypedDict, total=False):
    bio: str
    company: str
    created_at: str
    id: str
    location: str
    love: float
    name: str
    orbit_level: int
    reach: int
    slug: str
    tags: list
    tags_to_add: str
    title: str


class MemberLoadMatch(TypedDict):
    id: str
    workspace: str


class MemberListMatch(TypedDict):
    workspace: str


class MemberCreateDataRequired(TypedDict):
    workspace: str


class MemberCreateData(MemberCreateDataRequired, total=False):
    bio: str
    company: str
    created_at: str
    id: str
    location: str
    love: float
    name: str
    orbit_level: int
    reach: int
    slug: str
    tags: list
    tags_to_add: str
    title: str


class MemberUpdateDataRequired(TypedDict):
    id: str
    workspace: str


class MemberUpdateData(MemberUpdateDataRequired, total=False):
    bio: str
    company: str
    created_at: str
    location: str
    love: float
    name: str
    orbit_level: int
    reach: int
    slug: str
    tags: list
    tags_to_add: str
    title: str


class MemberRemoveMatch(TypedDict):
    id: str
    workspace: str
