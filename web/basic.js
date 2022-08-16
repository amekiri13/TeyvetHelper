const axios = require("axios")
const stringRandom = require('string-random');
const md5 = require("md5");
const {appVersion,clientType,OS_SALT,CN_SALT,OS_COOKIES,CN_COOKIES,userAgent} = require("config")

function queryBasicInfo(server,uid,callback) {
    let randomStr = stringRandom(6);
    let timestamp = Math.floor(Date.now() / 1000);
    let sign1 = md5(`salt=${OS_SALT}&t=${timestamp}&r=${randomStr}`);
    let sign2 = md5(`d7d38ba4719a2dfc6ec10c956733a8f4com.mihoyo.hyperion2.1.0${timestamp}`);
    axios.get(`https://bbs-api-os.hoyolab.com/game_record/genshin/api/index?server=${server}&role_id=${uid}`,
        {
            headers:{
                "x-rpc-app_version":appVersion,
                "x-rpc-client_type":clientType,
                Cookie: OS_COOKIES,
                DS: `${timestamp},${randomStr},${sign1},${sign2}`,
                Referer: "https://webstatic-sea.hoyoverse.com/",
                "User-Agent": userAgent
            }
        })
        .then(res => {
            callback(res);
        }).catch(err => {
            console.log(err);
        });
}

function queryBasicInfoCN(server,uid,callback) {
    let randomStr = stringRandom(6);
    let timestamp = Math.floor(Date.now() / 1000);
    let sign1 = md5(`salt=${CN_SALT}&t=${timestamp}&r=${randomStr}`);
    let sign2 = md5(`d7d38ba4719a2dfc6ec10c956733a8f4com.mihoyo.hyperion2.1.0${timestamp}`);
    axios.get(`https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/index?server=${server}&role_id=${uid}`,
        {
            headers:{
                "x-rpc-app_version":appVersion,
                "x-rpc-client_type":clientType,
                Cookie: CN_COOKIES,
                DS: `${timestamp},${randomStr},${sign1},${sign2}`,
                Referer: "https://webstatic.mihoyo.com/",
                "User-Agent": userAgent
            }
        })
        .then(res => {
            callback(res);
        }).catch(err => {
        console.log(err);
    });
}