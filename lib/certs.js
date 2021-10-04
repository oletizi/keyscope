const x509 = require('@peculiar/x509');
const {Base64} = require("js-base64");

module.exports.cert2String = function (cert) {
  let buf = ''
  if (cert) {
    buf += `
serialNumber           : ${cert.serialNumber}
subject                : ${cert.subject}
issuer                 : ${cert.issuer}
notBefore              : ${cert.notBefore}
notAfter               : ${cert.notAfter}
`.trim()
  }
  return buf
}

module.exports.splitCerts = function (base64) {
  const buffers = []
  if (base64) {
    const decoded = Base64.decode(base64)
    const lines = decoded.split(/\r\n|\n/)
    let buf = ""
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      switch (line) {
        case "-----BEGIN CERTIFICATE-----":
          // begin cert
          buf += line + '\n'
          break;
        case "-----END CERTIFICATE-----":
          // end cert
          buf += line + '\n'
          buffers.push(buf)
          buf = ""
          break
        default:
          buf += line + '\n'
      }
    }
  }
  return buffers
}

module.exports.parseCert = function (raw) {
  return new x509.X509Certificate(raw)
}