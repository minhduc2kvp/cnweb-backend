const express = require('express')
const router = express.Router()
const {getImageById} = require('../controller/image')

router.get('/:id', getImageById)

module.exports = router