const client = require('./client');
const models = { users, posts, check_in } = require('./models')
const { authenticate, compare, findUserFromToken, hash } = require('./auth')

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
            password VARCHAR(100),
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

    const _users = {
        test: {
            firstName: 'test',
            lastName: 'account',
            email: 'test@createtest.com',
            password: 'test'
        },
        red: {
            firstName: 'red',
            lastName: 'abdul rahim',
            email: 'rabdulr@icloud.com',
            password: 'test'
        }
    }

    const [test, red] = await Promise.all(Object.values(_users).map(user => users.createUser(user)))

    const _posts = {
        post1: {
            userId: red.id,
            mood: 'Angry',
            title: `I'm So Very Angry`,
            entry: 'So very angry about the day'
        },
        post2: {
            userId: test.id,
            mood: 'Grateful',
            title: 'So Happy',
            entry: `I'm oh so very happy`
        }
    }

    const [post1, post2] = await Promise.all(Object.values(_posts).map(post => posts.createPost(post)))

    const _checkIn = {
        checkIn1: {
            userId: red.id,
            mood: 'Happy',
            note: `I'm doing this!`
        },
        checkIn2: {
            userId: test.id,
            mood: 'Depressed',
            note: 'Failed a test'
        }
    }

    const [checkIn1, checkIn2] = await Promise.all(Object.values(_checkIn).map(checkIn => check_in.createCheckIn(checkIn)))

    const userMap = (await users.readAll()).reduce((acc, user) => {
        acc[user.firstName] = user;
        return acc;
    }, {});

    const postMap = (await posts.readAll()).reduce((acc, post) => {
        acc[post.title] = post;
        return acc;
    }, {});

    const checkInMap = (await check_in.readAll()).reduce((acc, checkIn) => {
        acc[checkIn.mood] = checkIn;
        return acc;
    }, {}); 

    return {
        users: userMap,
        posts: postMap,
        checkIns: checkInMap
    }
};

module.exports = {
    sync,
    models,
    authenticate,
    compare,
    findUserFromToken,
    hash
}