const express = require('express');
const router = express.Router();
const { users } = require('../db/models')

// Getting/creating user info?
// Look into schema's or GraphQL to access DB

router.post('/createUser', (req, res, next) => {
    users.createUser(req.body)
        .then(user => res.send(user))
        .catch(next)
});

module.exports = { router }