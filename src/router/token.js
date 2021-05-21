const express = require('express')
const router = express.Router()
const tokenController = require('../controller/token')

router.get('/', tokenController.verifyToken)

router.post('/login', tokenController.login)

router.post('/logout', function (req, res) {
    res.send('create new user- signup')
})

module.exports = router