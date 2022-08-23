var express = require('express');
var router = express.Router();
const {queryBasicInfo} = require('../web/basic');
const {queryDetailInfo} = require("../web/details");
const {queryAbyssInfo} = require("../web/abyss");

router.get("/BasicInfo",(req, res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    let cookie = req.query.cookie;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        if (cookie == undefined) {
            queryBasicInfo(server,uid,result => {
                res.json(result);
            });
        }
        else {
            queryBasicInfo(server,uid,result => {
                res.json(result);
            }, {cookie:cookie});
        }
    }
});

router.post("/BasicInfo",(req,res,next) => {
    let server = req.body.server;
    let uid = req.body.uid;
    let cookie = req.body.cookie;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        if (cookie == undefined) {
            queryBasicInfo(server,uid,result => {
                res.json(result);
            });
        }
        else {
            queryBasicInfo(server,uid,result => {
                res.json(result);
            }, {cookie:cookie});
        }
    }
});

router.get("/DetailInfo",(req, res, next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    let cookie = req.query.cookie;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        if (cookie == undefined) {
            queryDetailInfo(server,uid,result => {
                res.json(result);
            });
        }
        else {
            queryDetailInfo(server,uid,result => {
                res.json(result);
            },{cookie:cookie});
        }
    }
});

router.post("/DetailInfo",(req, res, next) => {
    let server = req.body.server;
    let uid = req.body.uid;
    let cookie = req.body.cookie;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        if (cookie == undefined) {
            queryDetailInfo(server,uid,result => {
                res.json(result);
            });
        }
        else {
            queryDetailInfo(server,uid,result => {
                res.json(result);
            },{cookie:cookie});
        }
    }
});

router.get("/AbyssInfo",(req,res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    let type = req.query.type;
    let cookie = req.query.cookie;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        if (cookie == undefined) {
            queryAbyssInfo(server,uid,type,result => {
                res.json(result);
            });
        }
        else {
            queryAbyssInfo(server,uid,type,result => {
                res.json(result);
            },{cookie:cookie});
        }
    }
});
router.post("/AbyssInfo",(req,res,next) => {
    let server = req.body.server;
    let uid = req.body.uid;
    let type = req.body.type;
    let cookie = req.body.cookie;
    if (server.includes("cn")) {
        res.json({"data":null,"message":"暂时不支持国服"});
    }
    else {
        if (cookie == undefined) {
            queryAbyssInfo(server,uid,type,result => {
                res.json(result);
            });
        }
        else {
            queryAbyssInfo(server,uid,type,result => {
                res.json(result);
            },{cookie:cookie});
        }
    }
});

module.exports = router;