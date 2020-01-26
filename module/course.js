const common = require('../helper/common');
//
function getCourseFunction(req, s, f) {
    let queries = [
        {
            sql: "Select courseName,credits,description,department,semester from course where course.offered = 1"
        }
    ];

    common.initQuery(queries, s, f)
}


function filterCourseFunction(req, s, f) {
    let filterParams = [{
        credits: req.body.credits
    }];

    let queries = [
        {
            sql: "Select courseName,description,department from course where course.credits = ?",
            params: filterParams
        }
    ];

    common.initQuery(queries, s, f);
}


module.exports = {
    filterCourse: function (req, s, f) {
        filterCourseFunction(req, s, f);
    },
    getCourse:function (req,s,f) {
        getCourseFunction(req,s,f);
    }
};