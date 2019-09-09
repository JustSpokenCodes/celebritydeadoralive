const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('We are 🔥');
});

server.get('/token', (req, res) => {
  const payload = {
    subject: 'I get it',
    username: 'hey bud'
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secret, options);
  console.log(token);

  res.json(token);
});

module.exports = server;
