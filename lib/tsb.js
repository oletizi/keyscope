const yaml = require('js-yaml')
const certs = require("./certs");
const {Base64} = require("js-base64");
const {cert2String} = require("./certs");

parseSecrets = function (raw) {
  const parsed = []
  const splitCerts = certs.splitCerts(raw)

  for (let i = 0; i < splitCerts.length; i++) {
    const certRaw = splitCerts[i]
    const cert = certs.parseCert(certRaw)
    parsed.push(cert)
  }
  return parsed
}

function parseXcpSecrets(rawYaml) {
  const y = yaml.load(rawYaml)
  const caCert = parseSecrets(y.data['ca.crt'])
  const tlsCert = parseSecrets(y.data['tls.crt'])


  return {
    'ca.crt': caCert,
    'tls.crt': tlsCert,
    'tls.key': y.data['tls.key'],
  }
}

function certArray2String(name, secrets) {
  let buf = ''
  const certsArray = secrets[name]
  for (let i = 0; i < certsArray.length; i++) {
    buf += `=== ${name} (${i}) ==================\n`
    const cert = certsArray[i]
    buf += cert2String(cert) + '\n\n'
  }
  return buf
}

module.exports.xcpSecrets2String = function (rawYaml) {
  let buf = ''
  const secrets = parseXcpSecrets(rawYaml)

  buf += certArray2String('ca.crt', secrets)
  buf += certArray2String('tls.crt', secrets)
  buf += '=== tls.key ========================\n'
  buf += Base64.decode(secrets['tls.key'])

  return buf
}