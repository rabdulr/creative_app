const express = require('express');
const router = express.Router();
const { check_in } = require('../db/models')

//only getting Posts for the moment
//look into schema's or GraphQL to access DB

router.get('/getCheckIns/:userId', (req, res, next) => {
    check_in.getCheckIns(req.params)
        .then(checkIns => res.send(checkIns))
        .catch(next)
});

router.post('/addMood', (req, res, next) => {
    check_in.createCheckIn(req.body)
        .then(currentMood => res.send(currentMood))
        .catch(next)
});

module.exports = { router }