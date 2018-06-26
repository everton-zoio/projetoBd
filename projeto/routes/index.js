var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.usuario == null){
    res.redirect("/login");
    return;
  }
  res.render("index", {
    usuario: req.session.nome
  });
});

router.get("/sair", function(req, res, next){
  logged = false;
  res.redirect("/login");
});
router.get("/index", function(req, res, next){
  res.redirect("/");
});

router.get('/login', function(req, res, next) {
  res.render('login', {erro: ""});
});

router.post("/login", function(req, res){
  var body = req.body;
  var sql = "SELECT * FROM Usuario WHERE RA=? AND PASSWORD=?";
  db.query(sql,[body.ra,body.password], function(err, result, field){
    if(err){
      console.log(err);
      return;
    }
    if(result.length){
      req.session.usuario = result[0].RA;
      req.session.nome = result[0].Nome;
      console.log("Usuario encontrado.\nUsuário:" + result[0].Nome);
      res.redirect("/");
      return;
    }
    res.render("login", {erro: "Usuário não encontrado"});

  });
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', {erro: null});
});
router.post("/cadastro", function(req, res, next){
  var body = req.body;
  var sql = "INSERT INTO Usuario VALUES ('"+ body.ra + "', '" + body.nome + "', '" + body.password + "')";
  db.query(sql, function(err, result, field){
    if(err){
      console.log(err);
      res.render("cadastro", {
        erro: true
      });
      return;
    }
    req.session.usuario = body.ra;
    req.session.nome = body.nome;
    res.redirect("/");
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
