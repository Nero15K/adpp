const common = require('../helper/common');
//
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "adpp",
    insecureAuth : true
});


function getHOD(req,res) {
    var department =req.body.department;
    var query = "Select headID from department where department.name = ?";
    connection.query(query, [department],function (error,result) {
        if (error){
            console.log(Error)
        }
        console.log(result);
        res.send(result);
    });

};



module.exports = {
    getHeadID:function (req,res) {
        getHOD(req,res);
    }
};