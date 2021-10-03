module.exports = {
    cert2String: (cert) => {
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
}