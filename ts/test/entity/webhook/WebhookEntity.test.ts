

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


describe('WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ORBIT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.Webhook()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ORBIT_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"activity_tags","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"activity_types","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"data","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"event_type","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"links","req":false,"type":"`$OBJECT`","index$":5},{"active":true,"name":"member_tags","req":false,"type":"`$ARRAY`","index$":6},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":7},{"active":true,"name":"secret","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"url","req":true,"type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"webhook","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /{workspace_slug}/webhooks","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"activity_tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"activity_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"event_type\":{\"type\":\"string\"},\"member_tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"secret\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"required\":[\"name\",\"event_type\",\"url\"],\"type\":\"object\"}}}},\"responses\":{\"201\":{\"description\":\"webhook created\"},\"403\":{\"description\":\"forbidden\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/{workspace_slug}/webhooks","segments":[{"var":"workspace_slug"},{"lit":"webhooks"}],"select":{"exist":["workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{workspace_slug}/webhooks/{id}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":{\"attributes\":{\"activity_keywords\":[],\"activity_tags\":[],\"activity_types\":[],\"created_at\":\"2023-02-28T19:21:14.909Z\",\"enabled\":true,\"event_type\":\"activity:created\",\"include_teammates\":false,\"member_tags\":[],\"name\":\"My Test Webhook\",\"updated_at\":\"2023-02-28T19:21:14.909Z\",\"url\":\"https://example.com/hook\"},\"id\":\"6ZbFM6\",\"type\":\"webhook\"}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace_slug}/webhooks/{id}","segments":[{"var":"workspace_slug"},{"lit":"webhooks"},{"var":"id"}],"select":{"exist":["id","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{workspace_slug}/webhooks","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":[{\"attributes\":{\"activity_keywords\":[],\"activity_tags\":[],\"activity_types\":[],\"created_at\":\"2023-02-28T19:21:14.379Z\",\"enabled\":true,\"event_type\":\"activity:created\",\"include_teammates\":false,\"member_tags\":[],\"name\":\"My Test Webhook\",\"updated_at\":\"2023-02-28T19:21:14.379Z\",\"url\":\"https://example.com/hook\"},\"id\":\"6qyFL6\",\"type\":\"webhook\"}],\"links\":{\"first\":\"/fake-workspace/webhooks?page=1\",\"last\":\"/fake-workspace/webhooks?page=1\",\"next\":null,\"prev\":null}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace_slug}/webhooks","segments":[{"var":"workspace_slug"},{"lit":"webhooks"}],"select":{"exist":["workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /{workspace_slug}/webhooks/{id}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"webhook deleted\"},\"403\":{\"description\":\"forbidden\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/{workspace_slug}/webhooks/{id}","segments":[{"var":"workspace_slug"},{"lit":"webhooks"},{"var":"id"}],"select":{"exist":["id","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"PUT /{workspace_slug}/webhooks/{id}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"activity_tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"activity_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"event_type\":{\"type\":\"string\"},\"member_tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"type\":\"string\"},\"secret\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"required\":[\"name\",\"event_type\",\"url\"],\"type\":\"object\"}}}},\"responses\":{\"204\":{\"description\":\"webhook updated\"},\"403\":{\"description\":\"forbidden\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/{workspace_slug}/webhooks/{id}","segments":[{"var":"workspace_slug"},{"lit":"webhooks"},{"var":"id"}],"select":{"exist":["id","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"webhook","name__orig":"webhook","Name":"Webhook","name_":"webhook","name-":"webhook","NAME":"WEBHOOK","index$":7}, {"active":true,"entity":"webhook","key$":"BasicWebhookFlow","kind":"basic","name":"BasicWebhookFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"webhook_ref01"},"match":{"workspace_slug":"workspace_slug01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{"workspace_slug":"workspace_slug01"},"input":{"ref":"webhook_ref01","srcdatavar":"webhook_ref01_data","suffix":"_up0","textfield":"event_type"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"webhook_ref01","srcdatavar":"webhook_ref01_data","suffix":"_dt0"},"match":{"id":"webhook01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"webhook_ref01","suffix":"_rm0"},"match":{"id":"webhook01","workspace_slug":"workspace_slug01"},"op":"remove","spec":[],"valid":[],"index$":3}]}, 'Webhook')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_ref01_ent = client.Webhook()
    let webhook_ref01_data = setup.data.new.webhook['webhook_ref01']
    webhook_ref01_data['workspace_slug'] = setup.idmap['workspace_slug01']

    webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data()
    assert(null != webhook_ref01_data.id)


    // UPDATE
    const webhook_ref01_data_up0: any = {}
    webhook_ref01_data_up0.id = webhook_ref01_data.id
    webhook_ref01_data_up0 ['workspace_slug'] = setup.idmap['workspace_slug']

    const webhook_ref01_markdef_up0 = { name: 'event_type', value: 'Mark01-webhook_ref01_' + setup.now }
    ;(webhook_ref01_data_up0 as any)[webhook_ref01_markdef_up0.name] = webhook_ref01_markdef_up0.value

    const webhook_ref01_resdata_up0 = (await webhook_ref01_ent.update(webhook_ref01_data_up0)).data()
    assert(webhook_ref01_resdata_up0.id === webhook_ref01_data_up0.id)

    assert((webhook_ref01_resdata_up0 as any)[webhook_ref01_markdef_up0.name] === webhook_ref01_markdef_up0.value)


    // LOAD
    const webhook_ref01_match_dt0: any = {}
    webhook_ref01_match_dt0.id = webhook_ref01_data.id
    const webhook_ref01_data_dt0 = (await webhook_ref01_ent.load(webhook_ref01_match_dt0)).data()
    assert(webhook_ref01_data_dt0.id === webhook_ref01_data.id)


    // REMOVE
    const webhook_ref01_match_rm0: any = { id: webhook_ref01_data.id }
    await webhook_ref01_ent.remove(webhook_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webhook/WebhookTestData.json')

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
    ['webhook01','webhook02','webhook03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ORBIT_TEST_WEBHOOK_ENTID': idmap,
    'ORBIT_TEST_LIVE': 'FALSE',
    'ORBIT_TEST_EXPLAIN': 'FALSE',
    'ORBIT_APIKEY': '',
  })

  idmap = env['ORBIT_TEST_WEBHOOK_ENTID']

  const live = 'TRUE' === env.ORBIT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ORBIT_TEST_WEBHOOK_ENTID']
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
  
