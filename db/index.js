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
            created DATE NOT NULL DEFAULT CURRENT_DATE,
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
            note TEXT,
            "datePosted" DATE NOT NULL DEFAULT CURRENT_DATE
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
            entry: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Aliquet lectus proin nibh nisl condimentum id venenatis a. Purus sit amet volutpat consequat mauris nunc congue nisi. Velit sed ullamcorper morbi tincidunt. Cursus turpis massa tincidunt dui. Arcu odio ut sem nulla pharetra diam. Libero justo laoreet sit amet cursus sit. Malesuada fames ac turpis egestas sed tempus urna et pharetra. Vitae purus faucibus ornare suspendisse sed. Elit ullamcorper dignissim cras tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada. Est velit egestas dui id ornare arcu odio ut. Volutpat commodo sed egestas egestas fringilla. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Lacus luctus accumsan tortor posuere ac ut consequat. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Et leo duis ut diam quam nulla porttitor massa. Ut etiam sit amet nisl. Malesuada fames ac turpis egestas integer eget aliquet.

            Vestibulum lorem sed risus ultricies tristique nulla aliquet. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Non nisi est sit amet. Turpis egestas pretium aenean pharetra magna ac. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Sapien pellentesque habitant morbi tristique senectus et netus. Nam libero justo laoreet sit amet cursus sit. Vel fringilla est ullamcorper eget nulla. Eget lorem dolor sed viverra ipsum. A pellentesque sit amet porttitor.`
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