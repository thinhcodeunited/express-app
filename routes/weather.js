const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');
const {isAuthenticated} = require('../middleware/auth');

router.use(isAuthenticated);

router.get('/', weatherController.display);

module.exports = router;