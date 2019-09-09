const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //BadToken
        res
          .staus(401)
          .json({ message: 'Hey man it just isnt working nad token' });
      } else {
        //decodedToken!
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'welp!, did not get through bro' });
  }
};
