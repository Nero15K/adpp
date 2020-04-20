// const common = require('../helper/common');
//
//
//
//
// function loginFunction(req, s, f) {
//     let loginParams = [{
//         id: req.body.id
//     },req.body.password ];
//
//     let queries = [
//         {
//             sql: "Select id from users where id =  ? and password = ?",
//             params: loginParams
//         }
//     ];
//     common.initQuery(queries, s, f);
// }
//
//
// module.exports = {
//     login:function (req,s,f) {
//         loginFunction(req,s,f);
//     }
// };
