const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe ('GET ../app', () => {
    it ('should return a 200 status', () =>{
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/);
    })
})