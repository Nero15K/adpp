
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

// returns course name department for a user given their prerequisites returned from /prerequisites
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



    var query = "select courseName, department, priority from course where (prerequisite =" +params.prerequisite+" or prerequisite = "+
        params.prerequisite2 +" or prerequisite = "+ params.prerequisite3 + ") and prerequisite2 is null and offered =1  and coreq = 0 union" +

        " "+"select courseName, department,priority from course where prerequisite is null and (course.id > "
        + params.prerequisite + " or course.id >" +params.prerequisite2+" or course.id >" +params.prerequisite3+
        " ) and (course.id != "+ params.prerequisite + " and course.id !=" +params.prerequisite2+" and course.id !=" +params.prerequisite3+ " ) and offered = 1 and coreq = 0 union "

        +"select courseName, department,priority from course where (prerequisite =" +params.prerequisite+" and prerequisite2 = "+ params.prerequisite2 + ") and offered =1 and coreq = 0 union " +
        "select courseName, department ,priority from course where  (prerequisite =" +params.prerequisite+" or prerequisite = "+
        params.prerequisite2 +" or prerequisite = "+ params.prerequisite3 + ") and prerequisite2 is null and offered =1  and coreq = 1 order by priority, courseName" +""
        // "select  courseName, department from course cos  where not exists(select history.studentID from history where id = history.courseID and history.studentID =15000  )"
        //
    //
    // var excludedSector;
    //
    // var exquery = "select  courseName, department from course except select  courseName, department from course cos  where exists(select history.studentID from history where cos.id = history.courseID and history.studentID =15000)"
    //
    // connection.query(exquery, params, function (error,result){
    //     console.log(exquery);
    //
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         console.log(result);
    //         res.send(result);
    //     }
    //
    // });


    connection.query(query, params,  function (error,result) {
        console.log(query);

        if (error){
            console.log(error)
            res.send(error)
        }


        else {



            console.log(result);
            res.send(result);
        }
    });
});



//// returns the last prerequisites that will be passed to the generate function, and maximum number of courses this student can register in
// (minimum can be any number but stick with 3 for now)
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




///// returns the duplicated courses that has to be excluded
router.get("/exclusions",function (req,res) {

    var studentID = req.query.studentID;


    var query = "select  courseName, department from course cos  where exists(select history.studentID from history where cos.id = history.courseID and history.studentID =?)";


    connection.query(query,[studentID],function (err, results) {
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


///var exc = fillEX();

function fillEX() {

    var query = "select  courseName, department from course cos  where exists(select history.studentID from history where cos.id = history.courseID and history.studentID =15000)";


    connection.query(query,function (err, results) {
        console.log(query);

        if(err){
            console.log(err);
        }
        else{
            console.log(results);

            exc = (results);
        }

    })
};





module.exports = router;
