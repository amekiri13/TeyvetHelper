var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '提瓦特小助手' });
});
// RESTful风格
router.get('/:uid',(req,res,next) => {
  res.render('index', { title: '提瓦特小助手',uid: req.params.uid });
});

module.exports = router;
