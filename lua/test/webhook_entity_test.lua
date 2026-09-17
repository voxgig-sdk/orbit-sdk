-- Webhook entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("orbit_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("WebhookEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Webhook(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = webhook_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "webhook." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set ORBIT_TEST_WEBHOOK_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local webhook_ref01_ent = client:Webhook(nil)
    local webhook_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.webhook"), "webhook_ref01"))
    webhook_ref01_data["workspace_slug"] = setup.idmap["workspace_slug01"]

    local webhook_ref01_data_result, err = webhook_ref01_ent:create(webhook_ref01_data, nil)
    assert.is_nil(err)
    webhook_ref01_data = helpers.to_map(type(webhook_ref01_data_result) == 'table' and webhook_ref01_data_result.data_get and webhook_ref01_data_result:data_get() or webhook_ref01_data_result)
    assert.is_not_nil(webhook_ref01_data)
    assert.is_not_nil(webhook_ref01_data["id"])

    -- UPDATE
    local webhook_ref01_data_up0_up = {
      id = webhook_ref01_data["id"],
      ["workspace_slug"] = setup.idmap["workspace_slug"],
    }

    local webhook_ref01_markdef_up0_name = "event_type"
    local webhook_ref01_markdef_up0_value = "Mark01-webhook_ref01_" .. tostring(setup.now)
    webhook_ref01_data_up0_up[webhook_ref01_markdef_up0_name] = webhook_ref01_markdef_up0_value

    local webhook_ref01_resdata_up0_result, err = webhook_ref01_ent:update(webhook_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local webhook_ref01_resdata_up0 = helpers.to_map(type(webhook_ref01_resdata_up0_result) == 'table' and webhook_ref01_resdata_up0_result.data_get and webhook_ref01_resdata_up0_result:data_get() or webhook_ref01_resdata_up0_result)
    assert.is_not_nil(webhook_ref01_resdata_up0)
    assert.are.equal(webhook_ref01_resdata_up0["id"], webhook_ref01_data_up0_up["id"])
    assert.are.equal(webhook_ref01_resdata_up0[webhook_ref01_markdef_up0_name], webhook_ref01_markdef_up0_value)

    -- LOAD
    local webhook_ref01_match_dt0 = {
      id = webhook_ref01_data["id"],
    }
    local webhook_ref01_data_dt0_loaded, err = webhook_ref01_ent:load(webhook_ref01_match_dt0, nil)
    assert.is_nil(err)
    local webhook_ref01_data_dt0_load_result = helpers.to_map(type(webhook_ref01_data_dt0_loaded) == 'table' and webhook_ref01_data_dt0_loaded.data_get and webhook_ref01_data_dt0_loaded:data_get() or webhook_ref01_data_dt0_loaded)
    assert.is_not_nil(webhook_ref01_data_dt0_load_result)
    assert.are.equal(webhook_ref01_data_dt0_load_result["id"], webhook_ref01_data["id"])

    -- REMOVE
    local webhook_ref01_match_rm0 = {
      id = webhook_ref01_data["id"],
    }
    local _, err = webhook_ref01_ent:remove(webhook_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function webhook_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/webhook/WebhookTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read webhook test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "webhook01", "webhook02", "webhook03", "workspace_slug01" },
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
  local entid_env_raw = os.getenv("ORBIT_TEST_WEBHOOK_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["ORBIT_TEST_WEBHOOK_ENTID"] = idmap,
    ["ORBIT_TEST_LIVE"] = "FALSE",
    ["ORBIT_TEST_EXPLAIN"] = "FALSE",
    ["ORBIT_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["ORBIT_TEST_WEBHOOK_ENTID"])
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
