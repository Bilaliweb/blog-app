const { Router } = require('express')
const { signupUser, redirectToLogin, redirectToSingup, loginUser } = require('../controllers/user')

// Router instance
const userRouter = Router()

// Get Login
userRouter.get('/login', redirectToLogin)
// Get Signup
userRouter.get('/signup', redirectToSingup)
// Post Signup
userRouter.post('/signup', signupUser)
// Post Login
userRouter.post('/login', loginUser)

module.exports = userRouter;