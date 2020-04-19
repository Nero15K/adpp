var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
const common = require('../helper/common');
const courseModule = require('../module/course');



var connection = mysql.createConnection({
    host: "166.62.27.55",
    user: "nizar",
    password: "12345",
    database: "adpp",
    insecureAuth : true
});


//get all offered courses
router.get("/", function (req,res) {
    var query = "Select courseName,credits,description,department,semester from course where course.offered = 1";
    connection.query(query, function (error,result) {
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

/// for testing skip
router.get("/hello", function (req,res) {

        res.send("hello");
});


//get offered courses from specific department (Department is passed a parameter)
router.get("/filter", function (req,res) {
    console.log("something to flag ");
    console.log("QUERY: "+ req.query);

    var department = req.query.department;
    console.log("department value:" + department);
    var query;
    query = "Select courseName,description,department from course where course.department = ? and offered = 1";

    connection.query(query,[department], function (error,result) {
        if (error){
            console.log("Error "+error)
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


// get courses controlled by specific Head of department, in a specific semester. (HeadID and Semester are passed as parameter)
router.get("/head", function (req,res) {

    var headID = req.query.headID;
    var semester = req.query.semester;
    var query;

    query = "Select id,courseName,description,department,offered from course,department where course.department = department.name and department.headID = ? and semester = ?";

    connection.query(query,[headID,semester], function (error,result) {
        if (error){
            console.log("Error");
            console.log(error);
            res.send(error);
        }

        //console.log(result.length);
        //console.log(error);
        //console.log(query);
        console.log(result);
        res.send(result);
    });
});

// Get all of the available semesters
router.get("/semester", function (req,res) {

    var query = " select distinct course.semester from course";
    connection.query(query, function (error,result) {
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            console.log(result);
            res.send(result);
        }
    });
});

// modify a course to be offered or not given its courseName and semester as parameters
router.put("/",function (req, res) {
    var offered = req.body.offered;
    var courseName = req.body.courseName;
    var semester = req.body.semester;
    var query = "update course set offered = ? where courseName = ? and semester =?";

    connection.query(query,[offered,courseName,semester], function (error,result) {
        if (error){
            console.log(error)
        }
        console.log(result);
        ///courseModule.getCourse(req,res);
        console.log("sending");
        res.send(result);
    });
});



module.exports = router;
