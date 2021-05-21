const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const auth = require('../middleware/auth')

var multer = require("multer")
var upload = multer({ dest: "public" })

// router.get('/', userController.getAllUsers)
router.post('/', userController.signup)
router.get('/', auth.isAuth, userController.getInfoUser)
router.put('/', auth.isAuth, userController.updateInfoUser)
router.delete('/', auth.isAuth, userController.deleteUser)

router.post('/upload_avatar', auth.isAuth, upload.single('avatar'), userController.uploadAvatar)
router.post('/upload_cover_image', auth.isAuth, upload.single('cover_image'), userController.uploadCoverImage)

module.exports = router