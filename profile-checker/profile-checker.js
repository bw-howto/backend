module.exports = accountType => {
    return (req, res, next) => {
        if (accountType === req.body.users.accountType) {
            
            next()
        } else {
            res.status(403).json({you: 'cannot touch this'})
        }
    }
}