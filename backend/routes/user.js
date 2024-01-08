const express = require('express')

const { signupuser, loginuser } =require('../controllers/userController')

const router = express.Router()

router.post('/login', loginuser)

router.post('/signup', signupuser)

module.exports = router;