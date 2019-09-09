const db = require('../database/dbConfig');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const server = require('./server');
const supertest = require('supertest');
const request = supertest(server);

describe('Authentocation suit', () => {
  describe('add()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should add 1 user', async () => {
      await Users.add({
        username: 'loveMoney',
        password: 'lovemymoneyhoney',
        email: 'test@test.com'
      });
      const users = await db('users');
      expect(users).toHaveLength(1);
    });
  });

  describe('find()', () => {
    it('should return a list of users', async () => {
      const users = await Users.find();
      expect(users).toHaveLength(1);
    });
  });

  describe('findBy()', () => {
    it('should return a user', async () => {
      const user = await Users.findBy({
        username: 'loveMoney',
        email: 'test@test.com'
      });
      expect(user).toHaveLength(1);
    });
  });

  describe('findById()', () => {
    it('should return a user with a specific id', async () => {
      const user = await Users.findById(1);
      expect(user).toEqual({
        id: 1,
        username: 'loveMoney',
        password: 'lovemymoneyhoney',
        email: 'test@test.com'
      });
    });
  });
});

describe('End point suite', () => {
  describe('testing', () => {
    server.get('/test', async (req, res) => {
      res.json({ message: 'pass!' });
    });
    it('Gets the test endpoint', async done => {
      const res = await request.get('/test');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('pass!');

      done();
    });
  });

  describe('login', () => {
    server.post('/login', async (req, res) => {
      let { username, email, password } = req.body;

      Users.findBy({ username })
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
        });
    });

    it('Gets the test endpoint', async done => {
      const res = await request.get('/login');
      expect(res.status).toBe(200);
      expect(res.body).toBe('pass!');

      done();
    });
  });
});
