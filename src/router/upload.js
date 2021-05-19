const express = require('express')
const router = express.Router()
const {uploadImages} = require('../controller/upload')
const auth = require('../middleware/auth')

var multer = require("multer")
var upload = multer({ dest: 'public' })

router.post('/image', auth.isAuth, upload.array('images'), uploadImages)

module.exports = router