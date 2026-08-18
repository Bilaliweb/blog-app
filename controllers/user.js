const User = require("../models/user");
const { createTokenForUser } = require("../services/auth");

// Sing up a new user
async function signupUser(req, res) {
    const { fullName, email, password } = req?.body;

    // Create a user in db
    await User.create({
        fullName,
        email,
        password
    })
    // Redirect to home screen
    return res.redirect('/')
}

// Log In a user
async function loginUser(req, res) {
    const { email, password } = req.body

    // Find user from db
    const findUser = await User.findOne({ email })

    // Throw error if user not found
    if (!findUser) return res.status(401).json({ msg: 'Invalid Credentials.' })

    // Compare user provided password to original hashed password for user trying to login
    const isMatch = await findUser.compareLoginPassword(password)

    // Throw error if incorrect password
    // if (!isMatch) return res.status(401).json({ msg: 'Incorrect Password.' })
    if (!isMatch) return res.render('login', { error: 'Incorrect Email or Password.' })

    // If all conditions are passed, return the jwt token
    const tokenForUser = createTokenForUser(findUser)
    console.log('Check token for user: ', tokenForUser);

    // Redirect to home screen
    return res.cookie('token', tokenForUser).redirect('/')
}

// Redirect to Login
function redirectToLogin(req, res) {
    return res.render('login')
}
// Redirect to Signup
function redirectToSingup(req, res) {
    return res.render('signup')
}

module.exports = {
    signupUser,
    loginUser,
    redirectToLogin,
    redirectToSingup
}