module.exports = accountType => {
  return (req, res, next) => {
    if (accountType === req.user.accountType) {
        console.log(req.user)
        
        
      next();
    } else {
        console.log(req.user)
      res.status(403).json({ you: "you must be logged in as a creator" });
    }
  };
};
