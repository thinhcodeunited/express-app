var express = require('express');
var router = express.Router();

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
});

router.get('/user/:id', function (req, res) {
  res.send('hello, user!')
})
router.get('/register', (req, res, next) => {
  res.render('users/register', {title : 'Register Form'})
});

module.exports = router;
