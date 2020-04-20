var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
// const common = require('../helper/common');
// const requestModule = require('../module/request');



var connection = mysql.createConnection({
    host: "166.62.27.55",
    user: "nizar",
    password: "12345",
    database: "adpp",
    insecureAuth : true
});

// get all requests
router.get("/", function (req,res) {
    var query = "Select * from request";
    connection.query(query, function (error,result) {
        if (error){
            console.log(error)
        }
        console.log(result);
        res.send(result);
    });
});


// get requests submitted by a specific student (By passing studentID as parameter)
router.get("/student", function (req,res) {
    var department = req.query.studentID;

    var query = "Select * from request where studentID = ?";
    connection.query(query,[department], function (error,result) {
        if (error){
            console.log("Die")
        }
        console.log(result);
        res.send(result);
    });
});


//get details of a request (by passing its id as parameter)
router.get("/details", function (req,res) {
    var id = req.query.id;

    var query = "Select * from request where id = ?";
    connection.query(query,[id], function (error,result) {
        if (error){
            console.log(error)
        }
        console.log(result);
        res.send(result);
    });
});


// create a new request (by passing courseName, description of the request,
//  department, HeadID, and semester, and date) this is used by the head of the department
// for date you can use 2020-04-29 as an Example
router.post("/head",function (req,res) {

    var courseName = req.body.courseName;
    var description = req.body.description;
    var studentID = null;
    var headID = req.body.headID;
    var yes = 0;
    var no = 0;
    var unsure = 0;
    var department = req.body.department;
    var studentsNo = 0;
    var status = "Pending";
    var semester = req.body.semester;
    var query = "insert into request set ?";


    var params ={
        studentID:studentID,
        courseName:courseName,
      description:description,
      headID:headID,
        unsure:0,
        department:department,
        status: status,
      semester:semester,
        date: req.body.date
    };

    connection.query(query,params,function (error,result) {
        if(error){
            console.log(error);
            res.send(error);
        }
        console.log(result);

        res.send(result);
    });
});


//this is a method to update a request, and the main use is to approve or deny a request
// (It MUST TAKE the id of the request)
// & possible parameters (courseName, description, and status, department and semester)
// most of should be the same since it the mai idea is to update the status only and the rest stays teh same
router.put('/', function (req,res) {
    var params ={
        id:req.body.id,
        courseName:req.body.courseName,
        description:req.body.description,
        department:req.body.department,
        status: req.body.status,
        semester:req.body.semester,
    };


    var query = "update request set ? where id =?";

    connection.query(query,[params,params.id],function (error,result) {
        if(error){
            console.log(error);
            res.send(error);
        }
        console.log(result);
        res.send(result);
    });
});



///Method for a student to create a new request it takes (studentID, courseName, description, semester,
// and headID,  and has a default status of pending )
router.post('/student', function (req,res) {

    var params ={
        studentID: req.body.studentID,
        courseName:req.body.courseName,
        description:req.body.description,
        department:req.body.department,
        status: "Pending",
        semester:req.body.semester,
        headID: req.body.headID,
        date: req.body.date
    };


    var query = "insert into request set ?";


    connection.query(query,[params],function (error,result) {
        if(error){
            console.log(error)
            res.send( error)
        }

            console.log(result);
            res.send(result);
        });
});



// given the id of the request and a chosen vote to be updated (passed values number of yes votes, no votes, and unsure votes)
// (when passing the values in the client side all of the vote counts will be retained from the requested id from a get request
// and only one will be updated as all of them are passed to this api call)
//NOTE: the votes sent in the body has to be Integers/Long instead of String because it will affect the updating
// todo find a way to update the value of one vote without touching the other two in the server side (i.e. transfer the workload to the server)
router.put('/vote', function (req,res) {

    var yes = req.body.yes;
    var no  = req.body.no;
    var unsure = req.body.unsure;
    var studentsNo = yes + no+ unsure;

    var params ={
        id:req.body.id,
        yes:yes,
        no:no,
        unsure:unsure,
        studentsNo: studentsNo,
    };


    var query = "update request set ? where id =?";

    connection.query(query,[params,params.id],function (error,result) {
        if(error){
            console.log(error);
            res.send(error);
        }
        console.log(result);
        res.send(result);
    });
});


module.exports = router;
