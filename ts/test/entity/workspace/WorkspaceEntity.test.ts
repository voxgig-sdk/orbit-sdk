

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OrbitSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('WorkspaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ORBIT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.Workspace()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ORBIT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workspace.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"included","req":false,"type":"`$ARRAY`","index$":2}],"id":{"field":"id","name":"id"},"name":"workspace","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"include_orbit_level_count","orig":"include_orbit_level_count","reqd":false,"type":"`$BOOLEAN`","index$":0}]},"contract":{"id":"GET /workspaces/{workspace_slug}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Include the number of members by Orbit Level in the attributes\",\"in\":\"query\",\"name\":\"include_orbit_level_counts\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":{\"attributes\":{\"activities_count\":1,\"created_at\":\"2023-02-28T19:21:15.825Z\",\"members_count\":1,\"name\":\"Fake Workspace\",\"orbit_level_counts\":{\"1\":0,\"2\":0,\"3\":1,\"4\":2},\"slug\":\"fake-workspace\",\"tags\":{},\"updated_at\":\"2023-02-28T19:21:15.916Z\"},\"id\":\"PvetbL\",\"relationships\":{\"last_activity\":{\"data\":{\"id\":\"ZPosrL\",\"type\":\"pull_request_activity\"}},\"last_member\":{\"data\":{\"id\":\"rmMS98\",\"type\":\"member\"}},\"repositories\":{\"data\":[]}},\"type\":\"workspace\"},\"included\":[{\"attributes\":{\"activities_count\":0,\"activities_score\":0,\"avatar_url\":\"http://github.com/avatar.png\",\"bio\":null,\"birthday\":null,\"company\":null,\"created\":false,\"created_at\":\"2023-02-28T19:21:15.894Z\",\"deleted_at\":null,\"devto\":null,\"discord\":null,\"discourse\":null,\"email\":null,\"first_activity_occurred_at\":null,\"github\":null,\"github_followers\":null,\"id\":\"rmMS98\",\"languages\":null,\"last_activity_occurred_at\":null,\"linkedin\":null,\"location\":null,\"love\":null,\"merged_at\":null,\"name\":\"RobertoRunolfsdottir\",\"orbit_level\":null,\"orbit_url\":\"http://localhost:3000/fake-workspace/members/robertorunolfsdottir\",\"pronouns\":null,\"reach\":0,\"shipping_address\":null,\"slug\":\"robertorunolfsdottir\",\"source\":\"installation\",\"tag_list\":[],\"tags\":[],\"teammate\":false,\"title\":null,\"topics\":null,\"tshirt\":null,\"twitter\":null,\"twitter_followers\":null,\"updated_at\":\"2023-02-28T19:21:15.894Z\",\"url\":null},\"id\":\"rmMS98\",\"relationships\":{\"identities\":{\"data\":[]},\"organizations\":{\"data\":[]}},\"type\":\"member\"},{\"attributes\":{\"action\":\"opened\",\"activity_link\":\"https://github.com/\",\"created_at\":\"2023-02-28T19:21:15.896Z\",\"g_created_at\":\"2023-02-28T20:21:15.886+01:00\",\"g_html_url\":\"https://github.com/\",\"g_merged\":false,\"g_merged_at\":null,\"g_merged_by\":null,\"g_number\":53,\"g_title\":\"Here is some new code\",\"is_pull_request\":null,\"key\":\"carol/donnette#53\",\"occurred_at\":\"2023-02-28T19:21:15.886Z\",\"orbit_url\":\"http://localhost:3000/fake-workspace/activities/ZPosrL\",\"properties\":{\"github_organization\":\"carol\",\"github_pull_request\":\"carol/donnette/#53\",\"github_repository\":\"carol/donnette\"},\"tags\":[\"channel:github\",\"github_organization:carol\",\"github_repository:carol/donnette\",\"github_pull_request:carol/donnette/#53\"],\"type\":\"PullRequestActivity\",\"updated_at\":\"2023-02-28T19:21:15.896Z\",\"weight\":\"1.0\"},\"id\":\"ZPosrL\",\"relationships\":{\"activity_type\":{\"data\":{\"id\":\"oWVsm9\",\"type\":\"activity_type\"}},\"member\":{\"data\":{\"id\":\"rmMS98\",\"type\":\"member\"}},\"repository\":{\"data\":{\"id\":\"6eeTk6\",\"type\":\"repository\"}}},\"type\":\"pull_request_activity\"}]}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/workspaces/{workspace_slug}","rename":{"param":{"workspace_slug":"id"}},"segments":[{"lit":"workspaces"},{"var":"id"}],"select":{"exist":["id","include_orbit_level_count"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /workspaces","json":"{\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":[{\"attributes\":{\"created_at\":\"2023-02-28T19:21:15.556Z\",\"name\":\"Fake Workspace\",\"slug\":\"fake-workspace\",\"updated_at\":\"2023-02-28T19:21:15.565Z\"},\"id\":\"15Vt67\",\"relationships\":{\"repositories\":{\"data\":[]}},\"type\":\"workspace\"}],\"included\":[]}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/workspaces","segments":[{"lit":"workspaces"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"workspace","name__orig":"workspace","Name":"Workspace","name_":"workspace","name-":"workspace","NAME":"WORKSPACE","index$":8}, {"active":true,"entity":"workspace","key$":"BasicWorkspaceFlow","kind":"basic","name":"BasicWorkspaceFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"workspace_ref01","srcdatavar":"workspace_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_ref01"}}],"index$":0}]}, 'Workspace')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let workspace_ref01_data = Object.values(setup.data.existing.workspace)[0] as any

    // LOAD
    const workspace_ref01_ent = client.Workspace()
    const workspace_ref01_match_dt0: any = {}
    workspace_ref01_match_dt0.id = workspace_ref01_data.id
    const workspace_ref01_data_dt0 = (await workspace_ref01_ent.load(workspace_ref01_match_dt0)).data()
    assert(workspace_ref01_data_dt0.id === workspace_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/workspace/WorkspaceTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OrbitSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['workspace01','workspace02','workspace03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ORBIT_TEST_WORKSPACE_ENTID': idmap,
    'ORBIT_TEST_LIVE': 'FALSE',
    'ORBIT_TEST_EXPLAIN': 'FALSE',
    'ORBIT_APIKEY': '',
  })

  idmap = env['ORBIT_TEST_WORKSPACE_ENTID']

  const live = 'TRUE' === env.ORBIT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ORBIT_TEST_WORKSPACE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OrbitSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
