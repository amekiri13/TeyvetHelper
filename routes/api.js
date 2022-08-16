var express = require('express');
var router = express.Router();
let {queryBasicInfo,queryBasicInfoCN} = require('../web/basic');

router.get("/BasicInfo",(req, res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        queryBasicInfo(server,uid,result => {
            res.json(result);
        });
    }
});

module.exports = router;