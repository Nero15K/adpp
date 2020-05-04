
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


    //////////////
    //var query = "select courseName, department, course.time from course where (prerequisite = 2 or prerequisite = 12) and offered = 1 union select courseName, department,course.time from adpp.course where (prerequisite is null) and (id > 3 or id >9) and offered = 1";
    /////////////
    //
    // var parent1;
    // var query1 = "select prerequisite1 from transcript where userID = '15000' ";
    //
    // connection.query(query1, function (error, result) {
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         parent1 = result;
    //         //console.log(result);
    //         console.log(parent1);
    //     }
    // });
    // // console.log("this parent 1: "+parent1);
    // var parent2 = connection.query("select prerequisite2 from transcript where userID = 15000");

    var params ={
        prerequisite:req.query.prerequisite1,
        prerequisite2:req.query.prerequisite2,
        prerequisite3:req.query.prerequisite3
    };



    var query = "select courseName, department, course.time from course where (prerequisite =" +params.prerequisite+" or prerequisite = "+ params.prerequisite2 +" or prerequisite = "+ params.prerequisite3 + ") and prerequisite2 is null and offered =1  and coreq = 0 union "+"select courseName, department, course.time from course where prerequisite is null and (course.id > "+ params.prerequisite + " or course.id >" +params.prerequisite2+" or course.id >" +params.prerequisite3+ " ) and (course.id != "+ params.prerequisite + " and course.id !=" +params.prerequisite2+" and course.id !=" +params.prerequisite3+ " ) and offered = 1 and coreq = 0 union " +"select courseName, department, course.time from course where (prerequisite =" +params.prerequisite+" and prerequisite2 = "+ params.prerequisite2 + ") and offered =1 and coreq = 0";



    connection.query(query, params, function (error,result) {
        console.log(query);

        if (error){
            console.log(error)
        }
        else {

            console.log(result);
            res.send(result);
        }
    });
});



router.get("/prerequisites",function (req,res) {

    var userID = req.query.userID;


    var query = "select * from transcript where userID = ?";


    connection.query(query,userID,function (err, results) {
        console.log(query);

        if(err){
            console.log(err);
        }
        else{
            console.log(results);
            res.send(results);
        }

    })
});


module.exports = router;
