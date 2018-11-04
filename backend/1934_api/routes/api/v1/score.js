var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');
var sortHelper = require('../../../helpers/sort.helper');


//Get all scores
//NEED TO FIX, TE GET ONLY SCORES AND USER INFORMATION...
router.get('/', function (req, res) {
    var data = []
    mongodbHelper.find({}, "user").then(function (users) {
        var limit = users.length;
        var limiter = 0;
        users.map((usr) => {
            mongodbHelper.find({ user_object_uid: "" + usr._id }, "match").then(function (scores) {
                var score = {
                    score: 0,
                    user: usr.nick
                }
                score.score = sortHelper.getHigherScore(scores);
                data.push(score);
                limiter++;
                if (limiter == limit)
                    responseHelper.respond(res, 200, undefined, data);
            }).catch(function (error) {
                responseHelper.respond(res, 500, error);
            });
        });
    }).catch(function (error) {
        responseHelper.respond(res, 500, error);
    });


});

module.exports = router;
