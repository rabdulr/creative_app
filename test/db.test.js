const db = require('../db');
const { expect } = require('chai');

describe('DB Check: ', () => {
    let users, posts, check_in;
    beforeEach(async() => {
        const seed = await db.sync();
        users = seed.users;
        posts = seed.posts;
    });

    it('There are 2 users', () => {
        expect(Object.keys(users).length).to.eq(2);
    });

    it('There is a user named Red', () => {
        expect(users.red.firstName).to.eq('red');
    });

    it('There are 2 posts', () => {
        expect(Object.keys(posts).length).to.eq(2)
    });

    describe('Posts', () => {
        let redsPosts;
        beforeEach(async() => {
            redsPosts = await db.models.posts.getPosts(users.red.id);
        });

        it('There is a post by Red', () => {
            expect(redsPosts).to.be.ok;
        });
    })

    describe('Check-Ins', () => {
        let checkIns;
        beforeEach(async() => {
            checkIns = await db.models.check_in.getCheckIns(users.red.id)
        });

        it('There are check-ins', () => {
            expect(checkIns).to.be.ok;
        })
    })

});