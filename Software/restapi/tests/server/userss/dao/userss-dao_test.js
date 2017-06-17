const mongoose = require('mongoose');
const expect = require('chai').expect;

const userssDAO = require(process.cwd() + '/server/api/userss/dao/userss-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('userssDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    userssDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
