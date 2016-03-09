const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const Image = require(__dirname + '/../../models/image');

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/imgrr_app_test';
const backendServer = require(__dirname + '/../../lib/backend_server');
const testPort = 3000;

describe('Images router', () => {
  before(() => {
    this.server = backendServer(testPort);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      this.server.close();
      mongoose.disconnect();
      done();
    });
  });

  it('should be able to retrieve all images', (done) => {
    request('localhost:' + testPort)
      .get('/api/images')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to post an image', (done) => {
    request('localhost:' + testPort)
      .post('/api/images')
      .send({ url: 'testurl' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.url).to.eql('testurl');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should handle a 404', (done) => {
    request('localhost:' + testPort)
      .get('/dne')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('Page not found');
        done();
      });
  });
});
