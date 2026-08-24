-- Orbit SDK error

local OrbitError = {}
OrbitError.__index = OrbitError


function OrbitError.new(code, msg, ctx)
  local self = setmetatable({}, OrbitError)
  self.is_sdk_error = true
  self.sdk = "Orbit"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OrbitError:error()
  return self.msg
end


function OrbitError:__tostring()
  return self.msg
end


return OrbitError
