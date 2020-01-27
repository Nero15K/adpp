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


//
// router.get("/", function (req,res) {
//     var query = "Select courseName,credits,description,department,semester from course where course.offered = 1";
//     connection.query(query, function (error,result) {
//         if (error){
//             console.log("Die")
//         }
//         console.log(result.length);
//         console.log(error);
//         console.log(query);
//         console.log(result);
//         res.send(result);
//     });
// });


router.get("/", function (req,res) {

    courseModule.getCourse(req,function (result) {
        //console.log(result)
        res.send(result)
    },
        function (err) {
            console.log(err);
            res.send(err);
        })
});

router.get("/filter", function (req,res) {

    var department = req.body.department;

    var query = "Select courseName,description,department from course where course.department = ? and offered = 1";
    connection.query(query,[department], function (error,result) {
        if (error){
            console.log("Die")
        }

        var x = {
          length: result.length
        };
        //console.log(result.length);
        //console.log(error);
        //console.log(query);
        //console.log(result);
        res.send(result);
    });
});

// router.get("/filter", function (req,res) {
//
//     courseModule.filterCourse(req,function (result) {
//             console.log(result)
//             res.send(result)
//         },
//         function (err) {
//             console.log(err);
//             res.send(err);
//         })
// });
module.exports = router;