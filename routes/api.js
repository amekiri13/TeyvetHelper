var express = require('express');
var router = express.Router();
const {queryBasicInfo,queryBasicInfoCN} = require('../web/basic');
const {queryDetailInfo} = require("../web/details");
const {queryAbyssInfo} = require("../web/abyss");

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

router.get("/DetailInfo",(req, res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        queryDetailInfo(server,uid,result => {
            res.json(result);
        });
    }
});

router.get("/AbyssInfo",(req,res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    let type = req.query.type;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        queryAbyssInfo(server,uid,type,result => {
            res.json(result);
        });
    }
});

module.exports = router;