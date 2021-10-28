const express = require('express');
const router = express.Router();
const covidController = require('../controller/covidController');
const {isAuthenticated} = require('../middleware/auth');

router.get('/', isAuthenticated, covidController.action);

module.exports = router;
