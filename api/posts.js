const express = require('express');
const router = express.Router();
const { posts } = require('../db/models')

//only getting Posts for the moment
//look into schema's or GraphQL to access DB

router.get('/getPosts/:userId', (req, res, next) => {
    posts.getPosts(req.params)
        .then(posts => res.send(posts))
        .catch(next)
});

module.exports = { router }