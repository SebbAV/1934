/**
 * This is an example of a new route, it includes a basic post
 */
var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');

router.post('/', function (req, res) {
    var credentials = req.body;
    if (!credentials.email || !credentials.password || !credentials.nick) {
        responseHelper.respond(res, 400, 'Bad request. The request was missing some parameters.');
        return;
    }
    var sha1HashedPassword = crypto.createHash('sha1').update(credentials.password).digest('hex');
    var object =
    {
        email: credentials.email,
        password: sha1HashedPassword,
        nick: credentials.nick
    }
    /*Params (object, collection)*/
    mongodbHelper.insertOne(object, "user").then(function (success) {
        responseHelper.respond(res, 200, "Inserted Correctly", success);
    }).catch(function (error) {
        responseHelper.respond(res, 500, error);
    });

});



module.exports = router;