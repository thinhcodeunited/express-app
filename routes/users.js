const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authBeforeLogin, isAuthenticated} = require('../middleware/auth');
const {capabilities, isAllowViewUsers} = require('../middleware/capability');

// REGISTER
router.get('/register', (req, res) => res.render('user/register', { title : 'Register form'}));
router.post('/register', userController.register)
//LOGIN
router.get('/login',isAuthenticated , (req, res) => res.render('user/login', { title : 'Login form'}));
router.post('/login', authBeforeLogin, userController.login);
// USER INFO
router.get('/userinfo', isAuthenticated, capabilities, userController.userinfo)
// LOGOUT
router.post('/logout', userController.logout);
// LIST USER
router.get('/user/list', isAuthenticated, capabilities, isAllowViewUsers, userController.listUsers)
router.get('/user/:id', function (req, res) {
  res.send('hello, user!')
})

module.exports = router;
