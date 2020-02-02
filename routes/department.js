var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
const common = require('../helper/common');
const courseModule = require('../module/course');



var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "adpp",
    insecureAuth : true
});


router.get("/", function (req,res) {

    var department = req.query.department;

    var query = "Select name from department";
    connection.query(query,[department], function (error,result) {
        if (error){
            console.log("Die")
        }
        console.log(result);
        res.send(result);
    });
});




module.exports = router;