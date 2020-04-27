var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
// const common = require('../helper/common');
// const requestModule = require('../module/request');



var connection = mysql.createPool({
    host: "166.62.27.55",
    user: "nizar",
    password: "12345",
    database: "adpp",
    insecureAuth : true
});

// returns course name department and time for user 15000
router.get("/", function (req,res) {
    // var query = "select name from tree where (parentID1 = 2 or parentID1 = 15) and offered = 1 union Select name from tree where parentID1 = 0  and ( id > 2 and id !=15) and offered = 1";

    var query = "select courseName, department, course.time from course where (prerequisite = 3 or prerequisite = 9) and offered = 1 union select courseName, department,course.time from adpp.course where (prerequisite is null) and (id > 3 or id >9) and offered = 1";

    //
    connection.query(query, function (error,result) {
        if (error){
            console.log(error)
        }
        console.log(result);
        res.send(result);
    });
});


module.exports = router;
