const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

/* GET home page. */
router.use('/', usersRouter, function(req, res, next) {
  res.render('index', { title: 'Express'});
});
module.exports = router;
