"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OrganizationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ORBIT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OrbitSDK.test();
        const ent = testsdk.Organization();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ORBIT_TEST_LIVE;
        for (const op of ['update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organization.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "crm_uid", "req": false, "short": "The unique identifier of the organization in your CRM.", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "crm_url", "req": true, "short": "A link to the organization profile in your CRM.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "data", "req": false, "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "deal_closed_date", "req": false, "short": "The date the organization became a customer.", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "lifecycle_stage", "req": true, "short": "The current stage of the organization in the marketing or sales process.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "links", "req": false, "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "owner_email", "req": false, "short": "The email of the team member who is in charge of the organization.", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "owner_name", "req": false, "short": "The name of the team member who is in charge of the organization.", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "price_plan", "req": false, "short": "The pricing plan the organization is on.", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "source", "req": true, "short": "The name of the CRM you use for tracking the organization.", "type": "`$STRING`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "organization", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "workspace_slug", "orig": "workspace_slug", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "direction", "orig": "direction", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "item", "orig": "item", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "sort", "orig": "sort", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /{workspace_slug}/organizations", "json": "{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"query\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"page\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"direction\",\"schema\":{\"enum\":[\"ASC\",\"DESC\"],\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"items\",\"schema\":{\"enum\":[\"10\",\"50\",\"100\"],\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"enum\":[\"name\",\"website\",\"members_count\",\"employees_count\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":[{\"attributes\":{\"active_since\":null,\"created_at\":\"2023-02-28T19:21:11.655Z\",\"crm_uid\":null,\"crm_url\":null,\"crunchbase\":null,\"deal_closed_date\":null,\"email_addresses\":null,\"employees_count\":null,\"estimated_annual_revenue\":null,\"facebook\":null,\"facebook_followers\":null,\"founded_in\":null,\"id\":\"nAeF3p\",\"industry\":null,\"last_active\":null,\"lifecycle_stage\":null,\"linkedin\":null,\"location\":null,\"members_count\":1,\"name\":\"Organization2\",\"organization_type\":null,\"owner_email\":null,\"owner_name\":null,\"price_plan\":null,\"source\":null,\"twitter\":null,\"twitter_followers\":null,\"updated_at\":\"2023-02-28T19:21:11.655Z\",\"website\":\"org2.example.com\"},\"id\":\"nAeF3p\",\"type\":\"organization\"},{\"attributes\":{\"active_since\":null,\"created_at\":\"2023-02-28T19:21:11.652Z\",\"crm_uid\":\"abcde123451\",\"crm_url\":\"https://example.com/1\",\"crunchbase\":null,\"deal_closed_date\":\"2023-02-28T19:21:11.668Z\",\"email_addresses\":null,\"employees_count\":null,\"estimated_annual_revenue\":null,\"facebook\":null,\"facebook_followers\":null,\"founded_in\":null,\"id\":\"n27FjR\",\"industry\":null,\"last_active\":null,\"lifecycle_stage\":\"customer\",\"linkedin\":null,\"location\":null,\"members_count\":1,\"name\":\"Organization1\",\"organization_type\":null,\"owner_email\":\"john.toto@example.com\",\"owner_name\":\"John Toto\",\"price_plan\":\"Enterprise\",\"source\":\"Fake CRM\",\"twitter\":null,\"twitter_followers\":null,\"updated_at\":\"2023-02-28T19:21:11.652Z\",\"website\":\"org1.example.com\"},\"id\":\"n27FjR\",\"type\":\"organization\"}],\"links\":{\"first\":\"http://localhost:3000/api/v1/bartonbrakus/organizations?direction=DESC&items=10&page=1&query=&sort=name&workspace=bartonbrakus\",\"next\":null,\"prev\":null}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{workspace_slug}/organizations", "segments": [{ "var": "workspace_slug" }, { "lit": "organizations" }], "select": { "exist": ["direction", "item", "page", "query", "sort", "workspace_slug"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "organization_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "workspace_slug", "orig": "workspace_slug", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /{workspace_slug}/organizations/{organization_id}", "json": "{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":{\"attributes\":{\"active_since\":null,\"created_at\":\"2023-02-28T19:21:12.080Z\",\"crm_uid\":null,\"crm_url\":null,\"crunchbase\":null,\"deal_closed_date\":null,\"email_addresses\":null,\"employees_count\":null,\"estimated_annual_revenue\":null,\"facebook\":null,\"facebook_followers\":null,\"founded_in\":null,\"id\":\"VlOFP7\",\"industry\":null,\"last_active\":null,\"lifecycle_stage\":null,\"linkedin\":null,\"location\":null,\"members_count\":1,\"name\":\"Organization1\",\"organization_type\":null,\"owner_email\":null,\"owner_name\":null,\"price_plan\":null,\"source\":null,\"twitter\":null,\"twitter_followers\":null,\"updated_at\":\"2023-02-28T19:21:12.080Z\",\"website\":\"example-47.com\"},\"id\":\"VlOFP7\",\"type\":\"organization\"}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{workspace_slug}/organizations/{organization_id}", "rename": { "param": { "organization_id": "id" } }, "segments": [{ "var": "workspace_slug" }, { "lit": "organizations" }, { "var": "id" }], "select": { "exist": ["id", "workspace_slug"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "organization_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "workspace_slug", "orig": "workspace_slug", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "PUT /{workspace_slug}/organizations/{organization_id}", "json": "{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"organization_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"crm_uid\":{\"description\":\"The unique identifier of the organization in your CRM.\",\"type\":\"string\"},\"crm_url\":{\"description\":\"A link to the organization profile in your CRM.\",\"type\":\"string\"},\"deal_closed_date\":{\"description\":\"The date the organization became a customer.\",\"type\":\"string\"},\"lifecycle_stage\":{\"description\":\"The current stage of the organization in the marketing or sales process.\",\"type\":\"string\"},\"owner_email\":{\"description\":\"The email of the team member who is in charge of the organization.\",\"type\":\"string\"},\"owner_name\":{\"description\":\"The name of the team member who is in charge of the organization.\",\"type\":\"string\"},\"price_plan\":{\"description\":\"The pricing plan the organization is on.\",\"type\":\"string\"},\"source\":{\"description\":\"The name of the CRM you use for tracking the organization.\",\"type\":\"string\"}},\"required\":[\"lifecycle_stage\",\"crm_url\",\"source\"],\"type\":\"object\"}}}},\"responses\":{\"204\":{\"description\":\"organization updated\"},\"403\":{\"description\":\"forbidden\"},\"422\":{\"description\":\"deal_closed_date is invalid\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/{workspace_slug}/organizations/{organization_id}", "rename": { "param": { "organization_id": "id" } }, "segments": [{ "var": "workspace_slug" }, { "lit": "organizations" }, { "var": "id" }], "select": { "exist": ["id", "workspace_slug"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "organization", "name__orig": "organization", "Name": "Organization", "name_": "organization", "name-": "organization", "NAME": "ORGANIZATION", "index$": 4 }, { "active": true, "entity": "organization", "key$": "BasicOrganizationFlow", "kind": "basic", "name": "BasicOrganizationFlow", "param": {}, "step": [{ "active": true, "data": { "workspace_slug": "workspace_slug01" }, "input": { "ref": "organization_ref01", "srcdatavar": "organization_ref01_data", "suffix": "_up0", "textfield": "crm_uid" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_ref01" } }], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "organization_ref01", "srcdatavar": "organization_ref01_data", "suffix": "_dt0" }, "match": { "id": "organization01", "workspace_slug": "workspace_slug01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_ref01" } }], "index$": 1 }] }, 'Organization');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let organization_ref01_data = Object.values(setup.data.existing.organization)[0];
        // UPDATE
        const organization_ref01_ent = client.Organization();
        const organization_ref01_data_up0 = {};
        organization_ref01_data_up0.id = organization_ref01_data.id;
        organization_ref01_data_up0['workspace_slug'] = setup.idmap['workspace_slug'];
        const organization_ref01_markdef_up0 = { name: 'crm_uid', value: 'Mark01-organization_ref01_' + setup.now };
        organization_ref01_data_up0[organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value;
        const organization_ref01_resdata_up0 = (await organization_ref01_ent.update(organization_ref01_data_up0)).data();
        (0, node_assert_1.default)(organization_ref01_resdata_up0.id === organization_ref01_data_up0.id);
        (0, node_assert_1.default)(organization_ref01_resdata_up0[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value);
        // LOAD
        const organization_ref01_match_dt0 = {};
        organization_ref01_match_dt0.id = organization_ref01_data.id;
        const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data();
        (0, node_assert_1.default)(organization_ref01_data_dt0.id === organization_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organization/OrganizationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OrbitSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ORBIT_TEST_ORGANIZATION_ENTID': idmap,
        'ORBIT_TEST_LIVE': 'FALSE',
        'ORBIT_TEST_EXPLAIN': 'FALSE',
        'ORBIT_APIKEY': '',
    });
    idmap = env['ORBIT_TEST_ORGANIZATION_ENTID'];
    const live = 'TRUE' === env.ORBIT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ORBIT_TEST_ORGANIZATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OrbitSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ORBIT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ORBIT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OrganizationEntity.test.js.map