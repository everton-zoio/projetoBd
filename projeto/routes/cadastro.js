var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('cadastro', { title: 'Express' });
  });


router.post('/', function(req, res, next){
    res.render("index", {});
});

module.export = router;