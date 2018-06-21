var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!logged)
    res.redirect("/cadastro");
  else
    res.render("/", {});
});
router.get("/index", function(req, res, next){
  res.redirect("../");
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post("/login", function(req, res){
  res.redirect("/");
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Express' });
});
router.post("/cadastro", function(req, res, next){
  var body = req.body;
  var sql = "INSERT INTO Usuario VALUES ('"+ body.ra + "', '" + body.nome + "', '" + body.password + "')";
  db.query(sql, function(err, result, field){
    if(err){
      console.log(err);
    }
      logged = true;
      res.render("index", {});

  });
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
