const client = require('../client');

const users = {
    // Read all is for admin purposes only
    // Have not created admin feature as of yet. Unsure if needed.
    readAll: async() => {
        return (await client.query('SELECT * FROM users')).rows;
    },
    createUser: async({ firstName, lastName, email, password }) => {
        const SQL = `INSERT INTO users ("firstName", "lastName", email, password) VALUES ($1, $2, $3, $4) RETURNING *`;

        return (await client.query(SQL, [firstName, lastName, email, password])).rows[0]
    },
    // updateUser is only updating general items, not password
    // Add update later for this
    updateUser: async({ firstName, lastName, email, id }) => {
        const SQL = `UPDATE users SET "firstName"=$1, "lastName"=$2, email=$3 WHERE id=$4`;

        return (await client.query(SQL, [firstName, lastName, email, id])).rows[0];
    }
};

module.exports = users;