# Webhook entity test

import json
import os
import time

import pytest

from orbit_sdk.utility.voxgig_struct import voxgig_struct as vs
from orbit_sdk import OrbitSDK
from orbit_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestWebhookEntity:

    def test_should_create_instance(self):
        testsdk = OrbitSDK.test(None, None)
        ent = testsdk.Webhook(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _webhook_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "webhook." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set ORBIT_TEST_WEBHOOK_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        webhook_ref01_ent = client.Webhook(None)
        webhook_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.webhook"), "webhook_ref01"))
        webhook_ref01_data["workspace_slug"] = setup["idmap"]["workspace_slug01"]

        webhook_ref01_data = helpers.to_map(runner.entity_data(webhook_ref01_ent.create(webhook_ref01_data, None)))
        assert webhook_ref01_data is not None
        assert webhook_ref01_data["id"] is not None

        # UPDATE
        webhook_ref01_data_up0_up = {
            "id": webhook_ref01_data["id"],
            "workspace_slug": setup["idmap"]["workspace_slug"],
        }

        webhook_ref01_markdef_up0_name = "event_type"
        webhook_ref01_markdef_up0_value = "Mark01-webhook_ref01_" + str(setup["now"])
        webhook_ref01_data_up0_up[webhook_ref01_markdef_up0_name] = webhook_ref01_markdef_up0_value

        webhook_ref01_resdata_up0 = helpers.to_map(runner.entity_data(webhook_ref01_ent.update(webhook_ref01_data_up0_up, None)))
        assert webhook_ref01_resdata_up0 is not None
        assert webhook_ref01_resdata_up0["id"] == webhook_ref01_data_up0_up["id"]
        assert webhook_ref01_resdata_up0[webhook_ref01_markdef_up0_name] == webhook_ref01_markdef_up0_value

        # LOAD
        webhook_ref01_match_dt0 = {
            "id": webhook_ref01_data["id"],
        }
        webhook_ref01_data_dt0_loaded = webhook_ref01_ent.load(webhook_ref01_match_dt0, None)
        webhook_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(webhook_ref01_data_dt0_loaded))
        assert webhook_ref01_data_dt0_load_result is not None
        assert webhook_ref01_data_dt0_load_result["id"] == webhook_ref01_data["id"]

        # REMOVE
        webhook_ref01_match_rm0 = {
            "id": webhook_ref01_data["id"],
        }
        webhook_ref01_ent.remove(webhook_ref01_match_rm0, None)



def _webhook_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/webhook/WebhookTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = OrbitSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["webhook01", "webhook02", "webhook03", "workspace_slug01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "ORBIT_TEST_WEBHOOK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ORBIT_TEST_WEBHOOK_ENTID": idmap,
        "ORBIT_TEST_LIVE": "FALSE",
        "ORBIT_TEST_EXPLAIN": "FALSE",
        "ORBIT_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ORBIT_TEST_WEBHOOK_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("workspace_slug") is None:
        idmap_resolved["workspace_slug"] = idmap_resolved.get("workspace_slug01")

    if env.get("ORBIT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("ORBIT_APIKEY"),
            },
            extra or {},
        ])
        client = OrbitSDK(helpers.to_map(merged_opts))

    _live = env.get("ORBIT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("ORBIT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
