const jsonwebtoken = require("jsonwebtoken")

const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        jsonwebtoken.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'A token is required to execute this action.'})
            } else {
                req.user = {
                    username: decodedToken.username,
                    accountType: decodedToken.accountType,
                }
                next()
            }
        })
    } else {
        res.status(400).json({message: 'no token provided'})
    }
}