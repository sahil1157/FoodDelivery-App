const express = require('express')
const router = express.Router()
const { handleUserSignup, handleUserLogin, handleVerify, handleLogout, handleUserDetalis, handleVerifyUsers, editUserProfile, findEmail, changePassword } = require('../Controllers/UserController')

router.post('/signup', handleUserSignup)
router.post('/login', handleUserLogin)
router.get('/payment', handleVerify)
router.post('/logout', handleLogout)
router.get('/profile', handleVerifyUsers, handleUserDetalis)
router.put('/changeprofile', handleVerifyUsers, editUserProfile)
router.get('/getemail', handleVerifyUsers, findEmail)
router.put('/changepassword', handleVerifyUsers, changePassword)
// router.get('/search/:key', getSearchDatas)
module.exports = router