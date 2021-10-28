const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')
const {isAuthenticated} = require('../middleware/auth');

router.get('/', isAuthenticated, postController.list);
router.post('/sync', isAuthenticated, postController.syncGhost)

module.exports = router;