module.exports.cert2String = function (cert) {
  return `
serialNumber           : ${cert.serialNumber}
subject                : ${cert.subject}
issuer                 : ${cert.issuer}
signatureAlgorithm.name: ${cert.signatureAlgorithm.name}
signatureAlgorithm.hash: ${cert.signatureAlgorithm.hash.name}
notBefore              : ${cert.notBefore}
notAfter               : ${cert.notAfter}
`.trim()
}

module.exports.splitCerts = function (base64) {
  const lines = base64.split(/\r\n|\n/)
  let buf = ""
  const buffers = []
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
  return buffers
}
