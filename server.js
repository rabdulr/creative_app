const db = require('./db');
const app = require('./app');

const port = process.env.PORT || 3000;

db.sync()
    .then(() => {
        app.listen(port, ()=> console.log(`Listening on port ${port}`))
    })
