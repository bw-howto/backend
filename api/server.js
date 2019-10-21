const express = require('express')
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../user/user-router')

const server = express()

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', usersRouter)

router.get("/", (req, res) => {
    res.send({ message: "working !!!" });
  });

module.exports = server