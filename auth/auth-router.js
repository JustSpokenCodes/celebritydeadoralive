const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');
const secrets = require('../config/secret');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
//Testing
router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post('/login', (req, res) => {
  let { username, email, password } = req.body;

  Users.findBy({ username, email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          message: `Welcome ${user.username || user.email}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'You are missing a required field ', error });
    });
});
function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
