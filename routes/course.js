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



router.get("/filter", function (req,res) {

    var department = req.query.department;
    var query;
    if (department.trim() === "ALL"){
         query = "Select courseName,description,department from course where offered = 1";
    }else{
        query = "Select courseName,description,department from course where course.department = ? and offered = 1";
    }
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


router.get("/head", function (req,res) {

    var headID = req.body.headID;
    var query;

    query = "Select id,courseName,description,department,offered from course,department where course.department = department.name and department.headID = ?";

    connection.query(query,[headID], function (error,result) {
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


router.put("/",function (req, res) {
    var offered = req.body.offered;
    var id = req.body.id;
    var query = "update course set offered = ? where id = ?";

    connection.query(query,[offered,id], function (error,result) {
        if (error){
            console.log(error)
        }
        console.log(result)
        courseModule.getCourse(req,res);
        res.send(result);
    });


});

module.exports = router;