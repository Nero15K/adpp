var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
const common = require('../helper/common');
const courseModule = require('../module/course');
const loginModule = require('../module/login');


// router.get("/", function (req,res) {
//
//     loginModule.login(req,function (result) {
//             console.log(result);
//             res.send(result)
//         },
//         function (err) {
//             console.log(err);
//             res.send(err);
//         })
// });

var connection = mysql.createConnection({
    host: "166.62.27.55",
    user: "nizar",
    password: "12345",
    database: "adpp",
    //insecureAuth : true
});

router.get("/", function (req,res) {

    var userID = req.query.id;
    var userPassword = req.query.password;
    var query = "Select id from users where id = ? and password = ?";
    connection.query(query,[userID,userPassword], function (error,result) {
        if (error){
            console.log("Die")
        }
        console.log(result.length);
        console.log(error);
        console.log(query);
        console.log(result);
        res.send(result);
    });
});



module.exports = router;
