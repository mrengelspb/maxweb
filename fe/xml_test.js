const fs = require('fs');
const xadesjs = require("xadesjs");
const { Crypto } = require("@peculiar/webcrypto");


xadesjs.Application.setEngine("NodeJS", new Crypto());

const xml = fs.readFileSync('fs');
    