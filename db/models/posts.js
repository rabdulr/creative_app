const client = require('../client');

const posts = {
    // Read all is for admin purposes only
    // Have not created admin feature as of yet. Unsure if needed.
    readAll: async() => {
        return (await client.query('SELECT * FROM posts')).rows;
    },
    createPost: async({ title, mood, entry, userId}) => {
        const SQL = `INSERT INTO posts (title, mood, entry, "userId") VALUES ($1, $2, $3, $4) RETURNING *`;

        return (await client.query(SQL, [title, mood, entry, userId])).rows[0];
    },
    // updateUser is only updating general items, not password
    // Add update later for this
    updatePost: async({ title, mood, entry, id }) => {
        const SQL = `UPDATE posts SET title=$1, mood=$2, entry=$3 WHERE id=$4`;

        return (await client.query(SQL, [title, mood, entry, id])).rows[0];
    },
    deletePost: async({id}) => {
        const SQL = `DELETE FROM posts WHERE id=$1`

        return (await client.query(SQL, [id]))
    },
    getPosts: async({userId}) => {
        return (await client.query(`SELECT * FROM posts WHERE "userId"=$1`, [userId]))
    }
};

module.exports = posts;