const fs = require('fs')
const tsb = require('./lib/tsb')
const {cert2String} = require("./lib/certs");

console.log(tsb.xcpSecrets2String(fs.readFileSync('test/resources/secret.yaml')))
