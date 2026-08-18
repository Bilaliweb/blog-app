// import jsonwebtoken
const jwt = require('jsonwebtoken')
const secret = 'thismysecret@%))and10'

// Creating a json web token for provided user
function createTokenForUser (user) {
    // Payload for user data
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }

    // Token creation
    const token = jwt.sign(payload, secret)
    return token
}

// Verify the token
function verifyUserToken (token) {
    // Verify the provided token with our own secret key which was used during creation
    const result = jwt.verify(token, secret)
    return result
}

module.exports = {
    createTokenForUser,
    verifyUserToken
}