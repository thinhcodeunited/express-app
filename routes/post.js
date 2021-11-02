const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')
const {isAuthenticated} = require('../middleware/auth');
const {isAllowViewPosts, isAllowCreatePost, isAllowEditPost, isAllowRemovePost} = require('../middleware/capability');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
const upload = multer({storage : storage});

router.use(isAuthenticated);
router.get('/', isAllowViewPosts, postController.list);
router.post('/sync', isAllowCreatePost, postController.syncGhost);
router.get('/new', isAllowCreatePost, postController.addPostView);
router.post('/new', isAllowCreatePost, upload.single('featureimage'), postController.addPost);
router.get('/:id', isAllowEditPost,  postController.editPostView);
module.exports = router;