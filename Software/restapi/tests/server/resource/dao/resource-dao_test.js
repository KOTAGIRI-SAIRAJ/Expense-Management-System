const mongoose = require('mongoose');
const expect = require('chai').expect;

const resourceDAO = require(process.cwd() + '/server/api/resource/dao/resource-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('resourceDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    resourceDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
