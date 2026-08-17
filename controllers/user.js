const User = require("../models/user");

// Sing up a new user
async function signupUser(req, res) {
    console.log('Request: ', req);
    
    const { fullName, email, password } = req?.body;

    // Create a user in db
    await User.create({
        fullName,
        email,
        password
    })

    return res.redirect('/')
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
    redirectToLogin,
    redirectToSingup
}