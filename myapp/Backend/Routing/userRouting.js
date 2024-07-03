const express = require('express')
const router = express.Router()
const { handleUserSignup, handleUserLogin, handleVerify, handleLogout, handleUserDetalis, handleVerifyUsers, editUserProfile, findEmail, changePassword, checkLoggedIn } = require('../Controllers/UserController')

router.get('/', checkLoggedIn)
router.post('/signup', handleUserSignup)
router.post('/login', handleUserLogin)
router.get('/payment', handleVerify)
router.post('/logout', handleLogout)
router.get('/profile', handleVerifyUsers, handleUserDetalis)
router.put('/changeprofile', handleVerifyUsers, editUserProfile)
router.get('/getemail', handleVerifyUsers, findEmail)
router.put('/changepassword', handleVerifyUsers, changePassword)
module.exports = router