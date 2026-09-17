
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


describe('ReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ORBIT_TEST_LIVE=TRUE.
  afterEach(liveDelay('ORBIT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.Report()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$OBJECT`","index$":0}],"name":"report","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"workspace_slug","orig":"workspace_slug","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"activity_type","orig":"activity_type","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"property","orig":"property","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"relative","orig":"relative","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /{workspace_slug}/reports","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"workspace_slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter activities after this date. Format: YYYY-MM-DD.\",\"in\":\"query\",\"name\":\"start_date\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter activities before this date. Format: YYYY-MM-DD.\",\"in\":\"query\",\"name\":\"end_date\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Relative timeframes. Format: this_<integer>_<period>, with period in [days, weeks, months, years]. For example, this_30_days.\",\"in\":\"query\",\"name\":\"relative\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"properties\",\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"activity_type\",\"schema\":{\"type\":\"string\"}},{\"deprecated\":true,\"description\":\"Deprecated in favor of the activity_type parameter.\",\"in\":\"query\",\"name\":\"type\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":{\"attributes\":{\"activities\":{\"foo:activity\":{\"count\":0,\"delta\":0,\"members\":{\"active_count\":0,\"active_delta\":0,\"new_count\":0,\"new_delta\":0,\"returning_count\":0,\"returning_delta\":0},\"source\":\"mysource\"},\"spec:activity\":{\"count\":1,\"delta\":0,\"members\":{\"active_count\":1,\"active_delta\":0,\"new_count\":1,\"new_delta\":0,\"returning_count\":0,\"returning_delta\":0},\"source\":\"mysource\"},\"total_count\":1,\"total_delta\":0},\"members\":{\"active_count\":1,\"active_delta\":0,\"new_count\":1,\"new_delta\":0,\"returning_count\":0,\"returning_delta\":0},\"overview\":{\"members_on_orbit_level_1_count\":0,\"members_on_orbit_level_2_count\":0,\"members_on_orbit_level_3_count\":0,\"members_on_orbit_level_4_count\":0,\"members_on_orbit_level_none_count\":1,\"total_members_count\":1},\"timeframe\":{\"end_date\":\"2023-02-28\",\"end_date_last\":\"2023-01-28\",\"start_date\":\"2023-01-29\",\"start_date_last\":\"2022-12-29\"},\"workspace_id\":\"1XOtmn\"},\"id\":\"1XOtmn\",\"type\":\"statistics\"}}}},\"description\":\"success\"}},\"security\":[{\"bearer\":[]}],\"securitySchemes\":{\"api_key\":{\"description\":\"Provide the API key in a query param called api_key. This is the least secure method, please use only for testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"bearer\":{\"description\":\"Provide a Authorization header with format 'Bearer <api_key>'. This is the recommended approach. Make sure to include the 'Bearer' part in the text box here.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{workspace_slug}/reports","segments":[{"var":"workspace_slug"},{"lit":"reports"}],"select":{"exist":["activity_type","end_date","property","relative","start_date","type","workspace_slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"report","name__orig":"report","Name":"Report","name_":"report","name-":"report","NAME":"REPORT","index$":5}, {"active":true,"entity":"report","key$":"BasicReportFlow","kind":"basic","name":"BasicReportFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"report_ref01","srcdatavar":"report_ref01_data","suffix":"_dt0"},"match":{"id":"report01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_ref01"}}],"index$":0}]}, 'Report')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_ref01_data = Object.values(setup.data.existing.report)[0]

    // LOAD
    const report_ref01_ent = client.Report()
    const report_ref01_match_dt0 = {}
    const report_ref01_data_dt0 = (await report_ref01_ent.load(report_ref01_match_dt0)).data()
    assert(null != report_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/report/ReportTestData.json')

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
    ['report01','report02','report03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ORBIT_TEST_REPORT_ENTID': idmap,
    'ORBIT_TEST_LIVE': 'FALSE',
    'ORBIT_TEST_EXPLAIN': 'FALSE',
    'ORBIT_APIKEY': '',
  })

  idmap = env['ORBIT_TEST_REPORT_ENTID']

  const live = 'TRUE' === env.ORBIT_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ORBIT_TEST_REPORT_ENTID']
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
  
