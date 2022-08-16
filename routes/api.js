var express = require('express');
var router = express.Router();
let {queryBasicInfo,queryBasicInfoCN} = require('../web/basic');

router.get("/BasicInfo",(req, res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    // 国服进入此处分支
    if (server.includes("cn")) {
        queryBasicInfoCN(server,uid,result => {
            res.json(result);
        })
    }
    else {
        queryBasicInfo(server,uid,result => {
            res.json(result);
        });
    }
});

module.exports = router;