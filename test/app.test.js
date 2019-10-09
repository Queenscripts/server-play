const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

//all pertaining to the app endpoint 
describe ('GET ../app', () => {
    it ('should return a 200 status', () =>{
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/);
    })

    it ('should return an array of at least one object', () =>{
        return supertest(app)
        .get('/apps')
        .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
        })
    })

    it ('should return a list of categories about the app, including the app name (App), Category and Rating', () =>{
        return supertest(app)
        .get('/apps')
        .then(res => {
            const app = res.body[0];
            expect(app).to.include.any.keys('App', 'Category', 'Rating')
        })
    })

    it ('should be 400 if sort is incorrect', () =>{
        return supertest(app)
        .get('/apps')
        .query({sort: 'hello'})
        .expect(400, 'Provide sort with rating or app name')
    });

})