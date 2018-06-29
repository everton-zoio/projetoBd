var express = require('express');
var router = express.Router();

router.post("/",(req, res, next) => {
    if(req.session.usuario){
        let body = req.body;
        let date = new Date();
        if(body.txt != ""){
            let sql = "INSERT INTO `chat Global` VALUES ('" + req.session.usuario + "', '" + body.txt + "', NOW())";
            console.log(Date.now());
            db.query(sql , (err, result)=>{
                if(err) console.log(err);
            });
        }
        res.redirect('/');
    }
    else{
        res.redirect('/login');
    }
});
router.get("/:DUsr&:data",(req, res, next) => {
    if(req.session.usuario){
        let usuario = req.params.DUsr;
        if(req.session.usuario = usuario){
            let data = req.params.data.replace("%20", " ").replace("data=", "");
            data = new Date(data);
            let hr = data.getHours(), min = data.getMinutes(), sc = data.getSeconds();
            if(hr < 10){
                hr = "0" + hr;
            }
            if(min < 10){
                min = "0" + min;
            }
            if(sc < 10){
                sc = "0" + sc;
            }
            let date = "" + data.getFullYear() + "-" + (data.getMonth() + 1)  + "-" + data.getDate() + " " + hr + ":" + min + ":" + sc;
            let sql = "DELETE FROM `chat Global` WHERE UsuarioId = '" + usuario.replace("DUsr=", "") + "' AND data = '" + date + "';";
            console.log(sql, usuario, date);
            db.query(sql, (err, result)=>{
                if(err) console.log(err);
            });
        }
        res.redirect("/");
    }
    else{
        res.redirect('/login');
    }
});
module.exports = router;