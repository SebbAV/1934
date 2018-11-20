var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');
var dateHelper = require("../../../helpers/date.helper");


router.post('/', function (req, res, next) {
    var objMatch = req.body;
    console.log(objMatch);
    if (!objMatch.user_object_uid || !objMatch.movements || !objMatch.completed) {
        responseHelper.respond(res, 400, 'Bad request. The request was missing some parameters.');
        return;
    }
    objMatch.date = dateHelper.getCurrentDatetime();
    mongodbHelper.insertOne(objMatch, "match").then(function (data) {
        responseHelper.respond(res, 200, "match inserted correctly", data);
    }).catch(function (error) {
        responseHelper.respond(res, 500, error);
    });
});



module.exports = router;