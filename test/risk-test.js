// load configurations
let config = require('../__config.js');

let chai = require('chai');
let chaiHTTP = require('chai-http');
let should = chai.should();
//enable us to send request to the app
chai.use(chaiHTTP);

let server = require('../app/server.js');
let data = require('./fixture/risk-fixture');

// Test suite for calculating risk score for each line of insurance and suggest the eligible insurance plans. 
describe('Risk Calculation', function() {
  // should return insurance plans based on input data
  it('should return insurance plans based on input data ' + config.router_prefix + '/risk POST', function(done){
    chai.request(server)
    .post(config.router_prefix + '/risk')
    .send(data[0])
    .end(function (error,response){
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.have.property('disability');
      response.body.should.have.property('auto');
      response.body.should.have.property('home');
      response.body.should.have.property('life');
      response.body.disability.should.equal('ineligible');
      response.body.auto.should.equal('regular');
      response.body.home.should.equal('economic');
      response.body.life.should.equal('regular');
      done();
    });
  });

  // If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively.
  it('If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and home insurance, respectively. ' + config.router_prefix + '/risk POST', function(done){
    chai.request(server)
    .post(config.router_prefix + '/risk')
    .send(data[1])
    .end(function (error,response){
      response.body.disability.should.equal('ineligible');
      response.body.auto.should.equal('ineligible');
      response.body.home.should.equal('ineligible');
      done();
    });
  });

  // If the user is over 60 years old, she is ineligible for disability and life insurance.
  it('If the user is over 60 years old, she is ineligible for disability and life insurance. ' + config.router_prefix + '/risk POST', function(done){
    chai.request(server)
    .post(config.router_prefix + '/risk')
    .send(data[2])
    .end(function (error,response){
      response.body.disability.should.equal('ineligible');
      response.body.life.should.equal('ineligible');
      done();
    });
  });

});//end describe
