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

func TestActivityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Activity(nil)
		if ent == nil {
			t.Fatal("expected non-nil ActivityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := activityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "activity." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ORBIT_TEST_ACTIVITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		activityRef01Ent := client.Activity(nil)
		activityRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "activity"}), "activity_ref01"))
		activityRef01Data["member_id"] = setup.idmap["member01"]
		activityRef01Data["workspace_slug"] = setup.idmap["workspace_slug01"]

		activityRef01DataResult, err := activityRef01Ent.Create(activityRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		activityRef01Data = core.ToMapAny(entityData(activityRef01DataResult))
		if activityRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if activityRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		activityRef01DataUp0Up := map[string]any{
			"id": activityRef01Data["id"],
			"member_id": setup.idmap["member_id"],
			"workspace_slug": setup.idmap["workspace_slug"],
		}

		activityRef01MarkdefUp0Name := "activity_type"
		activityRef01MarkdefUp0Value := fmt.Sprintf("Mark01-activity_ref01_%d", setup.now)
		activityRef01DataUp0Up[activityRef01MarkdefUp0Name] = activityRef01MarkdefUp0Value

		activityRef01ResdataUp0Result, err := activityRef01Ent.Update(activityRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		activityRef01ResdataUp0 := core.ToMapAny(entityData(activityRef01ResdataUp0Result))
		if activityRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if activityRef01ResdataUp0["id"] != activityRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if activityRef01ResdataUp0[activityRef01MarkdefUp0Name] != activityRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", activityRef01MarkdefUp0Name, activityRef01ResdataUp0[activityRef01MarkdefUp0Name])
		}

		// LOAD
		activityRef01MatchDt0 := map[string]any{
			"id": activityRef01Data["id"],
		}
		activityRef01DataDt0Loaded, err := activityRef01Ent.Load(activityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		activityRef01DataDt0LoadResult := core.ToMapAny(entityData(activityRef01DataDt0Loaded))
		if activityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if activityRef01DataDt0LoadResult["id"] != activityRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		activityRef01MatchRm0 := map[string]any{
			"id": activityRef01Data["id"],
		}
		_, err = activityRef01Ent.Remove(activityRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func activityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "activity", "ActivityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read activity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse activity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"activity01", "activity02", "activity03", "member01", "member02", "member03", "organization01", "organization02", "organization03", "workspace_slug01"},
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
	entidEnvRaw := os.Getenv("ORBIT_TEST_ACTIVITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ORBIT_TEST_ACTIVITY_ENTID": idmap,
		"ORBIT_TEST_LIVE":      "FALSE",
		"ORBIT_TEST_EXPLAIN":   "FALSE",
		"ORBIT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ORBIT_TEST_ACTIVITY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add member_id alias for update test.
	if idmapResolved["member_id"] == nil {
		idmapResolved["member_id"] = idmapResolved["member01"]
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
