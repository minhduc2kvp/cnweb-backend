const express = require('express')
const router = express.Router()
const {uploadImages} = require('../controller/upload')

var multer = require("multer")
var upload = multer({ dest: 'public' })

router.post('/image', upload.array('images'), uploadImages)

module.exports = router