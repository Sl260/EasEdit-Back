const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: 'Forbidden access' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No token provided' });
  }
});
