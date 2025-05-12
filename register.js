const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const JWT_SECRET = 'your_jwt_secret_key';

const register = (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Registration failed' });

    }
    res.status(201).json({ message: 'User registered successfully'});
  });
};

module.exports = { register };
