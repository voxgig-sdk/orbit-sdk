
const CRED_name = 'api_key'

const OPTION_apikey = 'apikey'

const NOTFOUND = '__NOTFOUND__'

function prepareAuth(ctx) {
  const utility = ctx.utility

  const struct = utility.struct
  const getprop = struct.getprop
  const setprop = struct.setprop
  const delprop = struct.delprop

  const client = ctx.client
  const spec = ctx.spec

  if (null == spec) {
    return ctx.error('auth_no_spec', 'Expected context spec property to be defined.')
  }

  const query = spec.query

  const options = client.options()

  // Public APIs that need no auth omit the options.auth block entirely.
  if (null == options.auth) {
    delprop(query, CRED_name)
    return spec
  }

  const apikey = getprop(options, OPTION_apikey, NOTFOUND)

  if (NOTFOUND === apikey || null == apikey || '' === apikey) {
    delprop(query, CRED_name)
  }
  else {
    setprop(query, CRED_name, apikey)
  }

  return spec
}

module.exports = {
  prepareAuth
}
