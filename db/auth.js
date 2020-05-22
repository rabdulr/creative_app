const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const client = require('./client');

//Get the user information and send it to the front
const findUserFromToken = async(token) => {
    const id = jwt.decode(token, process.env.JWT).id;
    const user = (await client.query('SELECT * FROM users WHERE id=$1', [id])).rows[0];
    delete user.password;
    return user;
}

//Hash passwords
const hash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashed) => {
            if (err) {
                return reject(err);
            }
            return resolve(hashed);
        });
    });
};

//Compare hashed and plain password
const compare = ({ plain, hashed }) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plain, hashed, (err, verified) => {
            if (err) {
                return reject(err)
            }
            if (verified) {
                console.log('Credentials are verified!');
                return resolve();
            }
            reject(Error('Incorrect credentials.'))
        });
    });
};

//Make sure everything matches up
const authenticate = async({ email, password }) => {
    const user = (await client.query('SELECT * FROM users WHERE email=$1', [email])).rows[0];
    await compare({ plain: password, hashed: user.password});
    return jwt.encode({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName}, process.env.JWT);
};

module.exports = {
    findUserFromToken,
    authenticate,
    compare,
    hash
}