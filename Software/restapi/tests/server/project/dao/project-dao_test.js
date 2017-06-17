const mongoose = require('mongoose');
const expect = require('chai').expect;

const projectDAO = require(process.cwd() + '/server/api/project/dao/project-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('projectDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    projectDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
