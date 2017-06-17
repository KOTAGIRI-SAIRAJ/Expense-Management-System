const mongoose = require('mongoose');
const expect = require('chai').expect;

const skateDAO = require(process.cwd() + '/server/api/skateboard/dao/skate-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('skateDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    skateDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
