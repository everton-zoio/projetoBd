var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.usuario == null){
    res.redirect("/login");
    return;
  }
  var sql = "SELECT * FROM `chat Global` C, Usuario U WHERE U.RA = C.UsuarioId ORDER BY data DESC;";
  db.query(sql, function(err, rows){
    res.render("index", {
      usuario: req.session.nome,
      login: req.session.usuario,
      chatG: rows
    });
  });
});

router.get("/index", function(req, res, next){
  res.redirect("/");
});

/* Login */
router.get('/login', function(req, res, next) {
  res.render('login', {erro: ""});
});

router.post("/login", function(req, res){
  var body = req.body;
  var sql = "SELECT * FROM Usuario WHERE RA='" + body.ra + "';";
  db.query(sql, function(err, result, field){
    if(err){
      console.log(err);
      return;
    }
    if(result.length){
        if(result[0].PassWord == body.password){
        req.session.usuario = result[0].RA;
        req.session.nome = result[0].Nome;
        res.redirect("/");
        return;
      }
      res.render("login", {
        erro: "Usuário ou Senha incorreta!"
      })
    }
    res.render("login", {
      erro: "Usuário não encontrado"
    });

  });
});

/* Logout */
router.get("/sair", function(req, res, next){
  req.session.destroy();
  res.redirect("/login");
});

/* Cadastro */
router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', {erro: null});
});

router.post("/cadastro", function(req, res, next){
  var body = req.body;
  if(body.password == body['repeat-password']){
    let sql = "INSERT INTO Usuario VALUES ('"+ body.usuario + "', '" + body.password + "', '" + body.nome + "')";
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
  }
  else{
    res.render("cadastro", {
      erro: "As senhas não conferem!"
    });
  }
});

router.get('/tables', function(req, res, next) {
  if(req.session.usuario == null){
    res.redirect("/login");
    return;
  }
  res.render('tables', { title: 'Express' });
});

router.get('/blank', function(req, res, next) {
  if(req.session.usuario == null){
    res.redirect("/login");
    return;
  }
  res.render('blank', { title: 'Express' });
});

router.get('/duvida', function(req, res, next) {
  if(req.session.usuario == null){
    res.redirect("/login");
    return;
  }
  res.render('duvida', { title: 'Express' });
});

module.exports = router;
