

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


describe('ActivityTypeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ORBIT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.ActivityType()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ORBIT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'activity_type.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"links","req":false,"type":"`$OBJECT`","index$":1}],"name":"activity_type","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{workspace_slug}/activity_types","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":[{\"attributes\":{\"channel\":\"content\",\"key\":\"post:created\",\"name\":\"Created content\",\"short_name\":\"Content created\",\"source\":\"content\",\"weight\":\"1.0\"},\"id\":\"5Gds1O\",\"type\":\"activity_type\"},{\"attributes\":{\"channel\":\"product\",\"key\":\"activated_account\",\"name\":\"Activated their account on product\",\"short_name\":\"Activated account\",\"source\":\"product\",\"weight\":\"6.0\"},\"id\":\"DOnsmL\",\"type\":\"activity_type\"}],\"links\":{\"first\":\"/mrsdaronpowlowski/activity_types?page=1\",\"last\":\"/mrsdaronpowlowski/activity_types?page=1\",\"next\":null,\"prev\":null}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace_slug}/activity_types","segments":[{"var":"workspace_slug"},{"lit":"activity_types"}],"select":{"exist":["workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"activity_type","name__orig":"activity_type","Name":"ActivityType","name_":"activity_type","name-":"activity-type","NAME":"ACTIVITY_TYPE","index$":1}, {"active":true,"entity":"activity_type","key$":"BasicActivityTypeFlow","kind":"basic","name":"BasicActivityTypeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"activity_type_ref01","srcdatavar":"activity_type_ref01_data","suffix":"_dt0"},"match":{"id":"activity_type01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-activity_type_ref01"}}],"index$":0}]}, 'ActivityType')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let activity_type_ref01_data = Object.values(setup.data.existing.activity_type)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const activity_type_ref01_ent = client.ActivityType()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/activity_type/ActivityTypeTestData.json')

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
    ['activity_type01','activity_type02','activity_type03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ORBIT_TEST_ACTIVITY_TYPE_ENTID': idmap,
    'ORBIT_TEST_LIVE': 'FALSE',
    'ORBIT_TEST_EXPLAIN': 'FALSE',
    'ORBIT_APIKEY': '',
  })

  idmap = env['ORBIT_TEST_ACTIVITY_TYPE_ENTID']

  const live = 'TRUE' === env.ORBIT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ORBIT_TEST_ACTIVITY_TYPE_ENTID']
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
  
