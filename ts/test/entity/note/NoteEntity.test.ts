

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


describe('NoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ORBIT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.Note()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ORBIT_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'note.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"body","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"data","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"included","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"links","req":false,"type":"`$OBJECT`","index$":4}],"id":{"field":"id","name":"id"},"name":"note","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"member_slug","orig":"member_slug","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"POST /{workspace_slug}/members/{member_slug}/notes","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"member_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"type\":\"string\"}},\"required\":[\"body\"],\"type\":\"object\"}}}},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"example\":{\"data\":{\"attributes\":{\"body\":\"heyo\",\"created_at\":\"2023-02-28T19:20:48.856Z\",\"id\":\"qR4fVo\",\"updated_at\":\"2023-02-28T19:20:48.856Z\"},\"id\":\"qR4fVo\",\"relationships\":{\"member\":{\"data\":{\"id\":\"jDdSYG\",\"type\":\"member\"}},\"user\":{\"data\":{\"id\":\"ZgeFNz\",\"type\":\"user\"}}},\"type\":\"note\"}}}},\"description\":\"note created\"},\"403\":{\"description\":\"forbidden\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/{workspace_slug}/members/{member_slug}/notes","segments":[{"var":"workspace_slug"},{"lit":"members"},{"var":"member_slug"},{"lit":"notes"}],"select":{"exist":["member_slug","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"member_slug","orig":"member_slug","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{workspace_slug}/members/{member_slug}/notes","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"member_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"page\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":[{\"attributes\":{\"body\":\"heyo\",\"created_at\":\"2023-02-28T19:20:49.147Z\",\"id\":\"o5Nf2J\",\"updated_at\":\"2023-02-28T19:20:49.147Z\"},\"id\":\"o5Nf2J\",\"relationships\":{\"member\":{\"data\":{\"id\":\"jPESm8\",\"type\":\"member\"}},\"user\":{\"data\":{\"id\":\"lqAFn8\",\"type\":\"user\"}}},\"type\":\"note\"}],\"included\":[{\"attributes\":{\"activities_count\":0,\"activities_score\":0,\"avatar_url\":\"http://github.com/avatar.png\",\"bio\":null,\"birthday\":null,\"company\":null,\"created\":false,\"created_at\":\"2023-02-28T19:20:49.130Z\",\"deleted_at\":null,\"devto\":null,\"discord\":null,\"discourse\":null,\"email\":null,\"first_activity_occurred_at\":null,\"github\":null,\"github_followers\":null,\"id\":\"jPESm8\",\"languages\":null,\"last_activity_occurred_at\":null,\"linkedin\":null,\"location\":null,\"love\":null,\"merged_at\":null,\"name\":\"ClydeHirtheII\",\"orbit_level\":null,\"orbit_url\":\"http://localhost:3000/misstyreecorkery/members/clydehirtheii\",\"pronouns\":null,\"reach\":0,\"shipping_address\":null,\"slug\":\"clydehirtheii\",\"source\":\"installation\",\"tag_list\":[],\"tags\":[],\"teammate\":false,\"title\":null,\"topics\":null,\"tshirt\":null,\"twitter\":null,\"twitter_followers\":null,\"updated_at\":\"2023-02-28T19:20:49.130Z\",\"url\":null},\"id\":\"jPESm8\",\"relationships\":{\"identities\":{\"data\":[]},\"organizations\":{\"data\":[]}},\"type\":\"member\"},{\"attributes\":{\"created_at\":\"2023-02-28T19:20:49.139Z\",\"name\":\"MrsDominicaLabadie\",\"updated_at\":\"2023-02-28T19:20:49.145Z\"},\"id\":\"lqAFn8\",\"type\":\"user\"}],\"links\":{\"first\":\"/misstyreecorkery/members/clydehirtheii/notes?page=1\",\"last\":\"/misstyreecorkery/members/clydehirtheii/notes?page=1\",\"next\":null,\"prev\":null}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace_slug}/members/{member_slug}/notes","segments":[{"var":"workspace_slug"},{"lit":"members"},{"var":"member_slug"},{"lit":"notes"}],"select":{"exist":["member_slug","page","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"member_id","orig":"member_slug","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"PUT /{workspace_slug}/members/{member_slug}/notes/{id}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"member_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"type\":\"string\"}},\"required\":[\"body\"],\"type\":\"object\"}}}},\"responses\":{\"204\":{\"description\":\"note updated\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/{workspace_slug}/members/{member_slug}/notes/{id}","rename":{"param":{"member_slug":"member_id"}},"segments":[{"var":"workspace_slug"},{"lit":"members"},{"var":"member_id"},{"lit":"notes"},{"var":"id"}],"select":{"exist":["id","member_id","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["member"]]},"key$":"note","name__orig":"note","Name":"Note","name_":"note","name-":"note","NAME":"NOTE","index$":3}, {"active":true,"entity":"note","key$":"BasicNoteFlow","kind":"basic","name":"BasicNoteFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"note_ref01"},"match":{"member_id":"member01","member_slug":"member_slug01","workspace_slug":"workspace_slug01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{"member_id":"member01","workspace_slug":"workspace_slug01"},"input":{"ref":"note_ref01","srcdatavar":"note_ref01_data","suffix":"_up0","textfield":"body"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-note_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"note_ref01","srcdatavar":"note_ref01_data","suffix":"_dt0"},"match":{"id":"note01","workspace_slug":"workspace_slug01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-note_ref01"}}],"index$":2}]}, 'Note')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const note_ref01_ent = client.Note()
    let note_ref01_data = setup.data.new.note['note_ref01']
    note_ref01_data['member_id'] = setup.idmap['member01']
    note_ref01_data['member_slug'] = setup.idmap['member_slug01']
    note_ref01_data['workspace_slug'] = setup.idmap['workspace_slug01']

    note_ref01_data = (await note_ref01_ent.create(note_ref01_data)).data()
    assert(null != note_ref01_data.id)


    // UPDATE
    const note_ref01_data_up0: any = {}
    note_ref01_data_up0.id = note_ref01_data.id
    note_ref01_data_up0 ['member_id'] = setup.idmap['member_id']
    note_ref01_data_up0 ['workspace_slug'] = setup.idmap['workspace_slug']

    const note_ref01_markdef_up0 = { name: 'body', value: 'Mark01-note_ref01_' + setup.now }
    ;(note_ref01_data_up0 as any)[note_ref01_markdef_up0.name] = note_ref01_markdef_up0.value

    const note_ref01_resdata_up0 = (await note_ref01_ent.update(note_ref01_data_up0)).data()
    assert(note_ref01_resdata_up0.id === note_ref01_data_up0.id)

    assert((note_ref01_resdata_up0 as any)[note_ref01_markdef_up0.name] === note_ref01_markdef_up0.value)


    // LOAD
    const note_ref01_match_dt0: any = {}
    note_ref01_match_dt0.id = note_ref01_data.id
    const note_ref01_data_dt0 = (await note_ref01_ent.load(note_ref01_match_dt0)).data()
    assert(note_ref01_data_dt0.id === note_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/note/NoteTestData.json')

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
    ['note01','note02','note03','member01','member02','member03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ORBIT_TEST_NOTE_ENTID': idmap,
    'ORBIT_TEST_LIVE': 'FALSE',
    'ORBIT_TEST_EXPLAIN': 'FALSE',
    'ORBIT_APIKEY': '',
  })

  idmap = env['ORBIT_TEST_NOTE_ENTID']

  const live = 'TRUE' === env.ORBIT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ORBIT_TEST_NOTE_ENTID']
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
  
