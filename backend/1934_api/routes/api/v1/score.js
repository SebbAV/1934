var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');


//Get all scores
//NEED TO FIX, TE GET ONLY SCORES AND USER INFORMATION...
router.get('/', function (req, res) {
    mongodbHelper.find({}, "match").then(function (success) {
        responseHelper.respond(res, 200, undefined, success);
    }).catch(function (error) {
        responseHelper.respond(res, 500, error);
    });
});

module.exports = router;
