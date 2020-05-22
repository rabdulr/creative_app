const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const api = require('./api')

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

const isLoggedIn = (req, res, next) => {
    if(!req.user) {
        const error = Error('Login: Not Authorized');
        error.status = 401;
        return next(error)
    };
    next();
};

//Middleware for adding user info to req, using the user token
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return next();
    }
    db.findUserFromToken(token)
        .then((auth) => {
            req.user = auth;
            next();
        })
        .catch((ex) => {
            const error = Error('Not Authorized');
            error.status = 401;
            next(error);
        });
});

app.post('/api/auth', (req, res, next) => {
    db.authenticate(req.body)
        .then((token) => {
            res.send({ token })
        })
        .catch((test_err) => {
            console.log('Error from db.authenticate: ', test_err);
            const error = Error('Not Authorized');
            error.status = 401;
            next(error)
        })
})

app.get('/api/auth', isLoggedIn, (req, res, next) => {
    res.send(req.user);
});

app.use('/api/posts', api.posts.router)
app.use('/api/checkIns', api.checkIn.router)

module.exports = app;