const mongoose = require('mongoose');
const expect = require('chai').expect;

const expenseDAO = require(process.cwd() + '/server/api/expense/dao/expense-dao');
const setupMongoose = require('../../_helpers/db').setupMongoose;



describe('expenseDAO', () => {
  before((done) => {
    setupMongoose(mongoose, done);
  });

  afterEach(() => {
    expenseDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
