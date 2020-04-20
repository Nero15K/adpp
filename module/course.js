// const common = require('../helper/common');
// //
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456789",
//     database: "adpp",
//     insecureAuth : true
// });
//
// function getCourseFunction(req,res) {
//     var query = "Select courseName,credits,description,department,semester from course where course.offered = 1";
//     connection.query(query, function (error,result) {
//         if (error){
//             console.log("Die")
//         }
//         console.log(result.length);
//         console.log(error);
//         console.log(query);
//         console.log(result);
//         //res.send(result);
//     });
//
// };
//
//
// function filterCourseFunction(req, s, f) {
//     let filterParams = [{
//         credits: req.body.credits
//     }];
//
//     let queries = [
//         {
//             sql: "Select courseName,description,department from course where course.credits = ?",
//             params: filterParams
//         }
//     ];
//
//     common.initQuery(queries, s, f);
// }
//
//
// module.exports = {
//     filterCourse: function (req, s, f) {
//         filterCourseFunction(req, s, f);
//     },
//     getCourse:function (req,res) {
//         getCourseFunction(req,res);
//     }
// };
