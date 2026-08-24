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

func TestMemberEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Member(nil)
		if ent == nil {
			t.Fatal("expected non-nil MemberEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"member": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Member(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Member(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := memberBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "member." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ORBIT_TEST_MEMBER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		memberRef01Ent := client.Member(nil)
		memberRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "member"}, setup.data), "member_ref01"))
		memberRef01Data["workspace"] = setup.idmap["workspace01"]

		memberRef01DataResult, err := memberRef01Ent.Create(memberRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		memberRef01Data = core.ToMapAny(entityData(memberRef01DataResult))
		if memberRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if memberRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		memberRef01Match := map[string]any{
			"workspace": setup.idmap["workspace01"],
		}

		memberRef01ListResult, err := memberRef01Ent.List(memberRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		memberRef01List, memberRef01ListOk := memberRef01ListResult.([]any)
		if !memberRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", memberRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(memberRef01List), map[string]any{"id": memberRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		memberRef01DataUp0Up := map[string]any{
			"id": memberRef01Data["id"],
			"workspace": setup.idmap["workspace"],
		}

		memberRef01MarkdefUp0Name := "bio"
		memberRef01MarkdefUp0Value := fmt.Sprintf("Mark01-member_ref01_%d", setup.now)
		memberRef01DataUp0Up[memberRef01MarkdefUp0Name] = memberRef01MarkdefUp0Value

		memberRef01ResdataUp0Result, err := memberRef01Ent.Update(memberRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		memberRef01ResdataUp0 := core.ToMapAny(entityData(memberRef01ResdataUp0Result))
		if memberRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if memberRef01ResdataUp0["id"] != memberRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if memberRef01ResdataUp0[memberRef01MarkdefUp0Name] != memberRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", memberRef01MarkdefUp0Name, memberRef01ResdataUp0[memberRef01MarkdefUp0Name])
		}

		// LOAD
		memberRef01MatchDt0 := map[string]any{
			"id": memberRef01Data["id"],
		}
		memberRef01DataDt0Loaded, err := memberRef01Ent.Load(memberRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		memberRef01DataDt0LoadResult := core.ToMapAny(entityData(memberRef01DataDt0Loaded))
		if memberRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if memberRef01DataDt0LoadResult["id"] != memberRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		memberRef01MatchRm0 := map[string]any{
			"id": memberRef01Data["id"],
		}
		_, err = memberRef01Ent.Remove(memberRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		memberRef01MatchRt0 := map[string]any{
			"workspace": setup.idmap["workspace01"],
		}

		memberRef01ListRt0Result, err := memberRef01Ent.List(memberRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		memberRef01ListRt0, memberRef01ListRt0Ok := memberRef01ListRt0Result.([]any)
		if !memberRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", memberRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(memberRef01ListRt0), map[string]any{"id": memberRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func memberBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "member", "MemberTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read member test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse member test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"member01", "member02", "member03", "workspace01"},
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
	entidEnvRaw := os.Getenv("ORBIT_TEST_MEMBER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ORBIT_TEST_MEMBER_ENTID": idmap,
		"ORBIT_TEST_LIVE":      "FALSE",
		"ORBIT_TEST_EXPLAIN":   "FALSE",
		"ORBIT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ORBIT_TEST_MEMBER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add workspace alias for update test.
	if idmapResolved["workspace"] == nil {
		idmapResolved["workspace"] = idmapResolved["workspace01"]
	}

	if env["ORBIT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ORBIT_APIKEY"],
			},
			extra,
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
