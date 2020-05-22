const client = require('../client');

const check_in = {
    // Read all is for admin purposes only
    // Have not created admin feature as of yet. Unsure if needed.
    readAll: async() => {
        return (await client.query('SELECT * FROM check_in')).rows;
    },
    createCheckIn: async({ mood, note}) => {
        const SQL = `INSERT INTO check_in (mood, note) VALUES ($1, $2) RETURNING *`;

        return (await client.query(SQL, [mood, note])).rows[0];
    },
    // updateUser is only updating general items, not password
    // Add update later for this
    updateCheckIn: async({ mood, note, id }) => {
        const SQL = `UPDATE posts SET mood=$1, note=$2 WHERE id=$3`;

        return (await client.query(SQL, [mood, note, id])).rows[0];
    },
    deleteCheckIn: async({id}) => {
        const SQL = `DELETE FROM check_in WHERE id=$1`

        return (await client.query(SQL, [id]))
    },
    getCheckIns: async({userId}) => {
        return (await client.query(`SELECT * FROM check_in WHERE "userId"=$1`, [userId]))
    }
};

module.exports = check_in;