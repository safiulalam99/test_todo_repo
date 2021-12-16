const request = require('supertest');

const app = require('../src/app');
/*
describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

*/

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: '👋🌎🌍🌏'
      }, done);
  });
});
