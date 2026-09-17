package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/orbit-sdk/go"
	"github.com/voxgig-sdk/orbit-sdk/go/core"

	vs "github.com/voxgig-sdk/orbit-sdk/go/utility/struct"
)

func TestWebhookEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Webhook(nil)
		if ent == nil {
			t.Fatal("expected non-nil WebhookEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := webhookBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "webhook." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ORBIT_TEST_WEBHOOK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		webhookRef01Ent := client.Webhook(nil)
		webhookRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "webhook"}), "webhook_ref01"))
		webhookRef01Data["workspace_slug"] = setup.idmap["workspace_slug01"]

		webhookRef01DataResult, err := webhookRef01Ent.Create(webhookRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		webhookRef01Data = core.ToMapAny(entityData(webhookRef01DataResult))
		if webhookRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if webhookRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		webhookRef01DataUp0Up := map[string]any{
			"id": webhookRef01Data["id"],
			"workspace_slug": setup.idmap["workspace_slug"],
		}

		webhookRef01MarkdefUp0Name := "event_type"
		webhookRef01MarkdefUp0Value := fmt.Sprintf("Mark01-webhook_ref01_%d", setup.now)
		webhookRef01DataUp0Up[webhookRef01MarkdefUp0Name] = webhookRef01MarkdefUp0Value

		webhookRef01ResdataUp0Result, err := webhookRef01Ent.Update(webhookRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		webhookRef01ResdataUp0 := core.ToMapAny(entityData(webhookRef01ResdataUp0Result))
		if webhookRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if webhookRef01ResdataUp0["id"] != webhookRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if webhookRef01ResdataUp0[webhookRef01MarkdefUp0Name] != webhookRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", webhookRef01MarkdefUp0Name, webhookRef01ResdataUp0[webhookRef01MarkdefUp0Name])
		}

		// LOAD
		webhookRef01MatchDt0 := map[string]any{
			"id": webhookRef01Data["id"],
		}
		webhookRef01DataDt0Loaded, err := webhookRef01Ent.Load(webhookRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		webhookRef01DataDt0LoadResult := core.ToMapAny(entityData(webhookRef01DataDt0Loaded))
		if webhookRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if webhookRef01DataDt0LoadResult["id"] != webhookRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		webhookRef01MatchRm0 := map[string]any{
			"id": webhookRef01Data["id"],
		}
		_, err = webhookRef01Ent.Remove(webhookRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func webhookBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "webhook", "WebhookTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read webhook test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse webhook test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"webhook01", "webhook02", "webhook03", "workspace_slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ORBIT_TEST_WEBHOOK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ORBIT_TEST_WEBHOOK_ENTID": idmap,
		"ORBIT_TEST_LIVE":      "FALSE",
		"ORBIT_TEST_EXPLAIN":   "FALSE",
		"ORBIT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ORBIT_TEST_WEBHOOK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add workspace_slug alias for update test.
	if idmapResolved["workspace_slug"] == nil {
		idmapResolved["workspace_slug"] = idmapResolved["workspace_slug01"]
	}

	if env["ORBIT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["ORBIT_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewOrbitSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ORBIT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ORBIT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
