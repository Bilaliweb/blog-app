const { Router } = require('express')
const { signupUser, redirectToLogin, redirectToSingup } = require('../controllers/user')

// Router instance
const userRouter = Router()

// Get Login
userRouter.get('/login', redirectToLogin)
// Get Signup
userRouter.get('/signup', redirectToSingup)
// Post Signup
userRouter.post('/signup', signupUser)

module.exports = userRouter;