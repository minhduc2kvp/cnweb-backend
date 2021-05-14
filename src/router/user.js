const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

var multer = require("multer")
var upload = multer({ dest: "public" })

router.get('/', userController.getAllUsers)

router.post('/', userController.signup)

router.get('/:user_id', userController.getInfoUser)

router.put('/:user_id', userController.updateInfoUser)

router.delete('/:user_id', userController.deleteUser)
router.post('/upload_avatar/:user_id', upload.single('avatar'), userController.uploadAvatar)
router.post('/upload_cover_image/:user_id', upload.single('cover_image'), userController.uploadCoverImage)

module.exports = router