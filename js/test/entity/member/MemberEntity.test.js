
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { OrbitSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('MemberEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ORBIT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.Member()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bio","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"company","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"created_at","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"location","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"love","req":false,"type":"`$NUMBER`","index$":5},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"orbit_level","req":false,"type":"`$INTEGER`","index$":7},{"active":true,"name":"reach","req":false,"type":"`$INTEGER`","index$":8},{"active":true,"name":"slug","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"tags","req":false,"type":"`$ARRAY`","index$":10},{"active":true,"name":"tags_to_add","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":12}],"id":{"field":"id","name":"id"},"name":"member","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"workspace","orig":"workspace","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /{workspace}/members","json":"{\"operationId\":\"createMember\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspace\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bio\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"slug\":{\"type\":\"string\"},\"tags_to_add\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"bio\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"love\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"orbit_level\":{\"type\":\"integer\"},\"reach\":{\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The created member\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/{workspace}/members","segments":[{"var":"workspace"},{"lit":"members"}],"select":{"exist":["workspace"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"workspace","orig":"workspace","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"tag","orig":"tag","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{workspace}/members","json":"{\"operationId\":\"listMembers\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"tags\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"bio\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"love\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"orbit_level\":{\"type\":\"integer\"},\"reach\":{\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"A page of members\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace}/members","segments":[{"var":"workspace"},{"lit":"members"}],"select":{"exist":["tag","workspace"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace","orig":"workspace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{workspace}/members/{id}","json":"{\"operationId\":\"getMember\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"bio\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"love\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"orbit_level\":{\"type\":\"integer\"},\"reach\":{\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested member\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace}/members/{id}","segments":[{"var":"workspace"},{"lit":"members"},{"var":"id"}],"select":{"exist":["id","workspace"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace","orig":"workspace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /{workspace}/members/{id}","json":"{\"operationId\":\"deleteMember\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/{workspace}/members/{id}","segments":[{"var":"workspace"},{"lit":"members"},{"var":"id"}],"select":{"exist":["id","workspace"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"workspace","orig":"workspace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"PUT /{workspace}/members/{id}","json":"{\"operationId\":\"updateMember\",\"parameters\":[{\"in\":\"path\",\"name\":\"workspace\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bio\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"slug\":{\"type\":\"string\"},\"tags_to_add\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"bio\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"location\":{\"type\":\"string\"},\"love\":{\"type\":\"number\"},\"name\":{\"type\":\"string\"},\"orbit_level\":{\"type\":\"integer\"},\"reach\":{\"type\":\"integer\"},\"slug\":{\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The updated member\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/{workspace}/members/{id}","segments":[{"var":"workspace"},{"lit":"members"},{"var":"id"}],"select":{"exist":["id","workspace"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"member","name__orig":"member","Name":"Member","name_":"member","name-":"member","NAME":"MEMBER","index$":0}, {"active":true,"entity":"member","key$":"BasicMemberFlow","kind":"basic","name":"BasicMemberFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"member_ref01"},"match":{"workspace":"workspace01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"workspace":"workspace01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"member_ref01"}}],"index$":1},{"active":true,"data":{"workspace":"workspace01"},"input":{"ref":"member_ref01","srcdatavar":"member_ref01_data","suffix":"_up0","textfield":"bio"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-member_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"member_ref01","srcdatavar":"member_ref01_data","suffix":"_dt0"},"match":{"id":"member01","workspace":"workspace01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-member_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"member_ref01","suffix":"_rm0"},"match":{"id":"member01","workspace":"workspace01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{"workspace":"workspace01"},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"member_ref01"}}],"index$":5}]}, 'Member')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const member_ref01_ent = client.Member()
    let member_ref01_data = setup.data.new.member['member_ref01']
    member_ref01_data['workspace'] = setup.idmap['workspace01']

    member_ref01_data = (await member_ref01_ent.create(member_ref01_data)).data()
    assert(null != member_ref01_data.id)


    // LIST
    const member_ref01_match = {}
    member_ref01_match['workspace'] = setup.idmap['workspace01']

    const member_ref01_list = (await member_ref01_ent.list(member_ref01_match)).map((e) => e.data())

    assert(!isempty(select(member_ref01_list, { id: member_ref01_data.id })))


    // UPDATE
    const member_ref01_data_up0 = {}
    member_ref01_data_up0.id = member_ref01_data.id
    member_ref01_data_up0 ['workspace'] = setup.idmap['workspace']

    const member_ref01_markdef_up0 = { name: 'bio', value: 'Mark01-member_ref01_' + setup.now }
    member_ref01_data_up0 [member_ref01_markdef_up0.name] = member_ref01_markdef_up0.value

    const member_ref01_resdata_up0 = (await member_ref01_ent.update(member_ref01_data_up0)).data()
    assert(member_ref01_resdata_up0.id === member_ref01_data_up0.id)

    assert(member_ref01_resdata_up0[member_ref01_markdef_up0.name] === member_ref01_markdef_up0.value)


    // LOAD
    const member_ref01_match_dt0 = {}
    member_ref01_match_dt0.id = member_ref01_data.id
    const member_ref01_data_dt0 = (await member_ref01_ent.load(member_ref01_match_dt0)).data()
    assert(member_ref01_data_dt0.id === member_ref01_data.id)


    // REMOVE
    const member_ref01_match_rm0 = {}
    member_ref01_match_rm0.id = member_ref01_data.id
    await member_ref01_ent.remove(member_ref01_match_rm0)
  

    // LIST
    const member_ref01_match_rt0 = {}
    member_ref01_match_rt0['workspace'] = setup.idmap['workspace01']

    const member_ref01_list_rt0 = (await member_ref01_ent.list(member_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(member_ref01_list_rt0, { id: member_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/member/MemberTestData.json')

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
    ['member01','member02','member03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ORBIT_TEST_MEMBER_ENTID': idmap,
    'ORBIT_TEST_LIVE': 'FALSE',
    'ORBIT_TEST_EXPLAIN': 'FALSE',
    'ORBIT_APIKEY': '',
  })

  idmap = env['ORBIT_TEST_MEMBER_ENTID']

  const live = 'TRUE' === env.ORBIT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ORBIT_TEST_MEMBER_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
