var express = require('express');
var router = express.Router();

router.get('/cadastro', function(req, res, next) {
    res.render('cadastro', { title: 'Express' });
  });


router.post('/cadastro', function(req, res, next){
    res.render("index", {});
});

module.export = router;