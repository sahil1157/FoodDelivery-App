const express = require('express')
const router = express.Router()
const { handleUserSignup, handleUserLogin, handleVerify } = require('../Controllers/UserController')

router.post('/signup', handleUserSignup)
router.post('/login', handleUserLogin)
router.get('/payment', handleVerify)
module.exports = router