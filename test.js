import * as yaml from 'js-yaml'
import * as fs from 'fs';
import * as x509 from "@peculiar/x509";
import {Base64} from "js-base64"
import {SubjectAlternativeNameExtension} from "@peculiar/x509";

const secret = yaml.load(fs.readFileSync('test/resources/secret.yaml'))
const tlsCrt = secret.data['tls.crt']
const tlsCrtDecoded = Base64.decode(tlsCrt)
const certs = getCerts(tlsCrtDecoded)
for (let i = 0; i < certs.length; i++) {
    const certRaw = certs[i]
    const cert = new x509.X509Certificate(certRaw)
    console.log('==================== CERT ===============================')
    console.log(cert)
    console.log(cert2String(cert))
    // const sanExtension = cert.getExtension(SubjectAlternativeNameExtension)
    // console.log('SAN')
    // console.log(sanExtension)
}

function cert2String(cert) {
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

function getCerts(raw) {
    const lines = raw.split(/\r\n|\n/)
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
