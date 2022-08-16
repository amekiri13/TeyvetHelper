var express = require('express');
var router = express.Router();

router.get("/BasicInfo",(req, res,next) => {
    let server = req.query.server;
    let uid = req.query.uid;
    if (server.contains("cn")) {

    }
    else {
        
    }
})

module.exports = router;