const express = require('express');
const router = express.Router();
const indexController = require('../../controller/public/indexController');

router.get('/', indexController.action);

module.exports = router;