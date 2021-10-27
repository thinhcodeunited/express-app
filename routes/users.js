const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {isAuthenticated} = require('../middleware/auth');
const {isAllowViewUsers} = require('../middleware/capability');

// USER INFO
router.get('/', isAuthenticated, userController.userinfo)
// LIST USER
router.get('/list', isAuthenticated, isAllowViewUsers, userController.listUsers);
router.get('/:id', isAuthenticated, isAllowViewUsers, userController.detailUser);
router.post('/', isAuthenticated, isAllowViewUsers, userController.editUser);
router.post('/remove', userController.removeUser)
module.exports = router;
