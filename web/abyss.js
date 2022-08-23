const axios = require("axios");
const {appVersion,clientType,OS_SALT,CN_SALT,OS_COOKIES,CN_COOKIES,userAgent} = require("./config");
let {generateDS} = require("../utils/ds");

function queryAbyssInfo(server,uid,schedule_type,callback,option) {
    let _result = generateDS(OS_SALT);
    axios.get(`https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss?server=${server}&role_id=${uid}&schedule_type=${schedule_type}`,
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

module.exports = {queryAbyssInfo}