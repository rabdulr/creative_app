const client = require('./client');
const models = { users } = require('./models')

const sync = async() => {

    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS check_in;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        DROP TYPE IF EXISTS moods;

        CREATE TYPE moods AS ENUM ('Angry', 'Frustrated', 'Depressed', 'Ashamed', 'Happy', 'Grateful');

        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "firstName" VARCHAR(100),
            "lastName" VARCHAR(100),
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(50),
            CHECK (char_length(email) > 0)
        );

        CREATE TABLE posts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            mood moods,
            title TEXT,
            entry TEXT,
            "datePosted" DATE NOT NULL DEFAULT CURRENT_DATE
        );

        CREATE TABLE check_in (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "userId" UUID REFERENCES users(id),
            mood moods,
            note TEXT
        );
    `;

    await client.query(SQL)
};

module.exports = {
    sync,
    models
}