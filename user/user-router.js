const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const Users = require("./user-model");
const secrets = require("../config/secrets");
const restricted = require('../middleware/restricted-middleware')

router.get("/", (req, res) => {
  res.send({ message: "working !!!" });
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "cannot add this user", error });
    });
});


router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.get('/users', restricted,  (req, res) => {
    Users.find()
    .then(users => {
        res.json({loggedInUser: req.username, users})
    })
    .catch(err => res.send(err))
})


function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id
  };
  const options = {
    expiresIn: "1h"
  };

  return jsonwebtoken.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
