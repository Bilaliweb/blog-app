const { verifyUserToken } = require("../services/auth")

function authenticateProvidedToken(cookieName) {
    console.log('In auth middleware...');
    
    return (req, res, next) => {
        // Verify the token
        const token = req.cookies[cookieName]

        // If cookie does not exist, just pass on
        if(!token) return next();
        
        try {
            const userPayload = verifyUserToken(token)
            req.user = userPayload
        } catch (error) {
            console.log('Error in verifying token: ', error);
        }

        return next();
    }
}

module.exports = {
    authenticateProvidedToken
}