const mongoose = require('mongoose');
const expect = require('chai').expect;

const expenceDAO = require(process.cwd() + '/server/api/expence/dao/expence-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('expenceDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    expenceDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
