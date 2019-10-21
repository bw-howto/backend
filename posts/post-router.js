const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const Posts = require("./post-model");
const secrets = require("../config/secrets");
const restricted = require("../middleware/restricted-middleware");
const accountType = require("../profile-checker/profile-checker");

router.get("/", (req, res) => {
  res.send({ message: "posts working !!!" });
});

router.get("/postList", restricted, (req, res) => {
  Posts.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send({message: 'get failed'}));
});



router.post("/createPost", restricted,  (req, res) => {
  const token = req.headers.authorization;
  let post = req.body;

  if (token) {
    jsonwebtoken.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "jwt error :(" });
      } else {
        id: decodedToken.id;
      }
      Posts.add(post)
        .then(post => res.status(200).json(post))
        .catch(err =>
          res.status(500).json({ message: "cannot add this post" })
        );
    });
  }
});

module.exports = router;
