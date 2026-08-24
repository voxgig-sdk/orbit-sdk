
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { OrbitSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('MemberEntity', async () => {

  test('instance', async () => {
    const testsdk = OrbitSDK.test()
    const ent = testsdk.Member()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
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
    'ORBIT_APIKEY': 'NONE',
  })

  idmap = env['ORBIT_TEST_MEMBER_ENTID']

  if ('TRUE' === env.ORBIT_TEST_LIVE) {
    client = new OrbitSDK(merge([
      {
        apikey: env.ORBIT_APIKEY,
      },
      extra
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
    now: Date.now(),
  }

  return setup
}
  
