var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
// const common = require('../helper/common');
// const courseModule = require('../module/course');



var connection = mysql.createConnection({
    host: "166.62.27.55",
    user: "nizar",
    password: "12345",
    database: "adpp",
    insecureAuth : true
});


/// Get all departments
router.get("/", function (req,res) {

    var department = req.query.department;

    var query = "Select * from department";
    connection.query(query,[department], function (error,result) {
        if (error){
            console.log("Die")
        }
        console.log(result);
        res.send(result);
    });
});




module.exports = router;
