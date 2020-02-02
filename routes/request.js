var express = require('express');
var router = express.Router();
var db = require('mysql');
const app = express();
var mysql = require('mysql');
// import common from 'helper';
const common = require('../helper/common');
const requestModule = require('../module/request');



var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "adpp",
    insecureAuth : true
});

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

router.post("/",function (req,res) {

    var subjectID = req.body.subjectID;
    var description = req.body.description;
    var studentID = req.body.studentID;
    var headID = req.body.headID;
    var yes = 0;
    var no = 0;
    var unsure = 0;
    var department = req.body.department;
    var studentsNo = 0;
    var status = "Approved";
    var semester = req.body.semester;

    var query = "insert into request set ?";

    var params ={
        studentID:studentID,
      subjectID:subjectID,
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

router.put('/', function (req,res) {
    var params ={
        id:req.body.id,
        subjectID:req.body.subjectID,
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


router.post('/student', function (req,res) {
    var headID = requestModule.getHeadID(req,res);
    console.log(headID.headID);
    var params ={
        studentID: req.body.studentID,
        subjectID:req.body.subjectID,

        description:req.body.description,
        department:req.body.department,
        status: "Pending",
        semester:req.body.semester,
    };


    var query = "insert into request set ?";

    connection.query(query,[params],function (error,result) {
        if(error){
            console.log(error);
            res.send(error);
        }
        console.log(result);
        res.send(result);
    });
});




module.exports = router;