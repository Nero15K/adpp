// const common = require('../helper/common');
// //
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: "166.62.27.55",
//     user: "nizar",
//     password: "12345",
//     database: "adpp",
//     insecureAuth : true
// });
//
//
// function getHOD(req,res) {
//     var department =req.query.department;
//     var query = "Select headID from department where department.name = ?";
//     connection.query(query, [department],function (error,result) {
//         if (error){
//             console.log(Error)
//         }
//         console.log("HEAD ID: "+result);
//         res.send(result);
//     });
//
// };
//
//
//
// module.exports = {
//     getHeadID:function (req,res) {
//         getHOD(req,res);
//     }
// };
