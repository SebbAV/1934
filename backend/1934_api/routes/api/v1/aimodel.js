var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var mongodbHelper = require('../../../helpers/mongodb.helper');
var dateHelper = require("../../../helpers/date.helper");
var tensorFlowHelper = require('../../../helpers/tensorflow.helper');


router.get('/', (req, res, next) => {
    tensorFlowHelper.startModel().then((data) => {
        responseHelper.respond(res, 200, "match started correctly", data);
    }).catch((error) => {
        responseHelper.respond(res, 500, error);
    });
});

module.exports = router;