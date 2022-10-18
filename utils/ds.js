const stringRandom = require('string-random');
const md5 = require("md5");
const {randomNum} = require("./random");
const {sortKeys} = require("./softkeys");
const crypto = require('crypto');
function generateDS(salt) {
    let randomStr = stringRandom(6);
    let timestamp = Math.floor(Date.now() / 1000);
    let sign1 = md5(`salt=${salt}&t=${timestamp}&r=${randomStr}`);
    let sign2 = md5(`d7d38ba4719a2dfc6ec10c956733a8f4com.mihoyo.hyperion2.1.0${timestamp}`);
    return {timestamp,randomStr,sign1,sign2};
}
function generateCnDS(body,query) {
    const salt = 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs'
    const time = Math.floor(Date.now() / 1000)
    // Integer between 100000 - 200000
    const random = Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000

    const b = body ? JSON.stringify(sortKeys(body)) : ''
    const q = query ? new URLSearchParams(sortKeys(query)) : ''

    const check = crypto
        .createHash('md5')
        .update(`salt=${salt}&t=${time}&r=${random}&b=${b}&q=${q}`)
        .digest('hex')

    const dynamic = {time:time,random:random,check:check}

    //`${time},${random},${check}`

    return dynamic
}

module.exports = {generateDS,generateCnDS}