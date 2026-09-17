-- Member entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("orbit_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("MemberEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Member(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = member_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "member." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set ORBIT_TEST_MEMBER_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local member_ref01_ent = client:Member(nil)
    local member_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.member"), "member_ref01"))
    member_ref01_data["workspace_slug"] = setup.idmap["workspace_slug01"]

    local member_ref01_data_result, err = member_ref01_ent:create(member_ref01_data, nil)
    assert.is_nil(err)
    member_ref01_data = helpers.to_map(type(member_ref01_data_result) == 'table' and member_ref01_data_result.data_get and member_ref01_data_result:data_get() or member_ref01_data_result)
    assert.is_not_nil(member_ref01_data)
    assert.is_not_nil(member_ref01_data["id"])

    -- UPDATE
    local member_ref01_data_up0_up = {
      id = member_ref01_data["id"],
      ["workspace_slug"] = setup.idmap["workspace_slug"],
    }

    local member_ref01_markdef_up0_name = "bio"
    local member_ref01_markdef_up0_value = "Mark01-member_ref01_" .. tostring(setup.now)
    member_ref01_data_up0_up[member_ref01_markdef_up0_name] = member_ref01_markdef_up0_value

    local member_ref01_resdata_up0_result, err = member_ref01_ent:update(member_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local member_ref01_resdata_up0 = helpers.to_map(type(member_ref01_resdata_up0_result) == 'table' and member_ref01_resdata_up0_result.data_get and member_ref01_resdata_up0_result:data_get() or member_ref01_resdata_up0_result)
    assert.is_not_nil(member_ref01_resdata_up0)
    assert.are.equal(member_ref01_resdata_up0["id"], member_ref01_data_up0_up["id"])
    assert.are.equal(member_ref01_resdata_up0[member_ref01_markdef_up0_name], member_ref01_markdef_up0_value)

    -- LOAD
    local member_ref01_match_dt0 = {
      id = member_ref01_data["id"],
    }
    local member_ref01_data_dt0_loaded, err = member_ref01_ent:load(member_ref01_match_dt0, nil)
    assert.is_nil(err)
    local member_ref01_data_dt0_load_result = helpers.to_map(type(member_ref01_data_dt0_loaded) == 'table' and member_ref01_data_dt0_loaded.data_get and member_ref01_data_dt0_loaded:data_get() or member_ref01_data_dt0_loaded)
    assert.is_not_nil(member_ref01_data_dt0_load_result)
    assert.are.equal(member_ref01_data_dt0_load_result["id"], member_ref01_data["id"])

    -- REMOVE
    local member_ref01_match_rm0 = {
      id = member_ref01_data["id"],
    }
    local _, err = member_ref01_ent:remove(member_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function member_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/member/MemberTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read member test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "member01", "member02", "member03", "organization01", "organization02", "organization03", "workspace_slug01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("ORBIT_TEST_MEMBER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["ORBIT_TEST_MEMBER_ENTID"] = idmap,
    ["ORBIT_TEST_LIVE"] = "FALSE",
    ["ORBIT_TEST_EXPLAIN"] = "FALSE",
    ["ORBIT_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["ORBIT_TEST_MEMBER_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["workspace_slug"] == nil then
    idmap_resolved["workspace_slug"] = idmap_resolved["workspace_slug01"]
  end

  if env["ORBIT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["ORBIT_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["ORBIT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["ORBIT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
