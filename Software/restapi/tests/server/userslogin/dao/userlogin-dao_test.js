const mongoose = require('mongoose');
const expect = require('chai').expect;

const userloginDAO = require(process.cwd() + '/server/api/userslogin/dao/userlogin-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('userloginDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    userloginDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
