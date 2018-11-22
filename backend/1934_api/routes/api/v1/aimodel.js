var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');
var dateHelper = require("../../../helpers/date.helper");
var tensorFlowHelper = require('../../../helpers/tensorflow.helper');


router.post('/', (req, res, next) => {
    tensorFlowHelper.startModel().then((data) => {
        responseHelper.respond(res, 200, "match started correctly", data);
    }).catch((error) => {
        responseHelper.respond(res, 500, error);
    });
});
router.post('/move', (req, res, next) => {
    var movements = req.body;
    if (!movements.movements) {
        responseHelper.respond(res, 400, 'Bad request. The request was missing some parameters.');
        return;
    }
    tensorFlowHelper.move(movements).then((data) => {
        responseHelper.respond(res, 200, "door generated", data);
    }).catch((err) => {
        responseHelper.respond(res, 500, err);
    })
});
router.post('/stop', (req, res, next) => {
    tensorFlowHelper.stopModel().then((data) => {
        responseHelper.respond(res, 200, "match stopped correctly", data);
    }).catch((err) => {
        responseHelper.respond(res, 500, err);
    });
});

module.exports = router;