var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');


router.post('/', function (req, res, next) {
    var objMatch = req.body;
    mongodbHelper.insertOne(objMatch, "match").then(function (data) {
        responseHelper.respond(res, 200, "match inserted correctly", data);
    }).catch(function (error) {
        responseHelper.respond(res, 500, error);
    });
});


module.exports = router;