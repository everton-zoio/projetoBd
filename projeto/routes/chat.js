var express = require('express');
var router = express.Router();

router.post("/",(req, res, next) => {
    if(req.session.usuario){
        let body = req.body;
        let date = new Date();
        let data = "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "";
        let sql = "INSERT INTO `chat Global` VALUES ('" + req.session.usuario + "', '" + body.txt + "', '" + data + "')";
        console.log(Date.now());
        db.query(sql , (err, result)=>{
            res.redirect('/');
        });
    }
    else{
        res.redirect('/login');
    }
});

module.exports = router;