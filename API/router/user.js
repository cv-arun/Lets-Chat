const express = require('express')
const router = express.Router();

const verify = require('../middleware/jwt')
const auth=require('../controller/authController')
const userController=require('../controller/userController')

router.post('/signup',auth.signup);
router.post('/login',auth.login);
router.post('/loginGoogle',auth.loginWithGoogle);
router.post('/updateUser',auth.updateUser)
router.get('/getUsers',verify,auth.getUsers)
router.post('/getChat',verify,userController.getChat)
router.get('/isLogedIn',verify,auth.isLogedIn)




module.exports = router