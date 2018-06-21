var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Express' });
});
router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Express' });
});

router.get('/blank', function(req, res, next) {
  res.render('blank', { title: 'Express' });
});

router.get('/duvida', function(req, res, next) {
  res.render('duvida', { title: 'Express' });
});

module.exports = router;
