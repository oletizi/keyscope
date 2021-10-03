//import * as yaml from 'js-yaml'
const yaml = require('js-yaml')
const fs = require('fs')
const x509 = require('@peculiar/x509')
const Base64 = require('js-base64')
const {cert2String, splitCerts} = require('./lib/cert')

// import {SubjectAlternativeNameExtension} from "@peculiar/x509";

const secret = yaml.load(fs.readFileSync('test/resources/secret.yaml'))
const tlsCrt = secret.data['tls.crt']
const tlsCrtDecoded = Base64.decode(tlsCrt)
const certs = splitCerts(tlsCrtDecoded)
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

