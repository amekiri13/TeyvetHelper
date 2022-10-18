const axios = require("axios");
const {appVersion,clientType,OS_SALT,CN_SALT,OS_COOKIES,CN_COOKIES,userAgent, clientTypeCN, userAgentCN} = require("./config");
let {generateDS, generateCnDS} = require("../utils/ds");

function queryBasicInfo(server,uid,callback,option) {
    let _result = generateDS(OS_SALT);
    axios.get(`https://bbs-api-os.hoyolab.com/game_record/genshin/api/index?server=${server}&role_id=${uid}`,
        {
            headers:{
                "x-rpc-app_version":appVersion,
                "x-rpc-client_type":clientType,
                Cookie: option == undefined ? OS_COOKIES : option.cookie,
                DS: `${_result.timestamp},${_result.randomStr},${_result.sign1},${_result.sign2}`,
                Referer: "https://webstatic-sea.hoyoverse.com/",
                "User-Agent": userAgent
            }
        })
        .then(res => {
            callback(res.data);
        }).catch(err => {
            console.log(err);
        });
}

function queryBasicInfoCN(server,uid,callback) {
    let _body,_query;
    _query = {server:server,role_id:uid};
    let _result = generateCnDS(_body,_query);

    axios.get(`https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/index`,
        {
            headers:{
                "x-rpc-app_version":appVersion,
                "x-rpc-client_type":clientTypeCN,
                Cookie: CN_COOKIES,
                DS: `${_result.time},${_result.random},${_result.check}`,
                Origin: "https://webstatic.mihoyo.com/",
                "User-Agent": userAgentCN,
                Referer:
                    'https://webstatic.mihoyo.com/app/community-game-records/index.html?v=6',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,en-US;q=0.8',
                'X-Requested-With': 'com.mihoyo.hyperion',
                Accept: 'application/json, text/plain, */*',
            },params:_query
        })
        .then(res => {
            callback(res.data);
        }).catch(err => {
        console.log(err);
    });
}

module.exports = {queryBasicInfo,queryBasicInfoCN}