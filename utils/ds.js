const stringRandom = require('string-random');
const md5 = require("md5");
function generateDS(salt) {
    let randomStr = stringRandom(6);
    let timestamp = Math.floor(Date.now() / 1000);
    let sign1 = md5(`salt=${salt}&t=${timestamp}&r=${randomStr}`);
    let sign2 = md5(`d7d38ba4719a2dfc6ec10c956733a8f4com.mihoyo.hyperion2.1.0${timestamp}`);
    return {timestamp,randomStr,sign1,sign2};
}

module.exports = {generateDS}