const express = require('express')
const router = express.Router()
const searchController = require('../controller/search')
const authMiddleware = require('../middleware/auth')
// middleware that is specific to this router
router.use(authMiddleware.isAuth)

router.get('/search_user', searchController.searchUser)


module.exports = router