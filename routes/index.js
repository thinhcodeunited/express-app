const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {auth, isAuthenticated} = require('../middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});
// REGISTER
router.get('/register', (req, res) => res.render('user/register', { title : 'Register form'}));
router.post('/register', userController.register)

//LOGIN
router.get('/login',isAuthenticated , (req, res) => res.render('user/login', { title : 'Login form'}));
router.post('/login', auth, userController.login);

//User info
router.get('/userinfo', isAuthenticated, userController.userinfo)


router.post('/logout', userController.logout);
module.exports = router;
