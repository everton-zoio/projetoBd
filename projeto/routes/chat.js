var express = require('express');
var router = express.Router();

router.post("/",(req, res, next) => {
    if(req.session.usuario){
        let body = req.body;
        let sql = "INSERT INTO `chat Global` VALUES ('" + req.session.usuario + "', '" + body.txt + "', '2018-06-29')";
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