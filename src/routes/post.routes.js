const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createPostController } = require('../controllers/post.controller');
const multer = require('multer');

const upload = multer({storage:multer.memoryStorage()})
// Post api / post / protected hai 
router.post('/',authMiddleware, /* req.body = userData */
    upload.single('image'),
    createPostController) 


module.exports = router;