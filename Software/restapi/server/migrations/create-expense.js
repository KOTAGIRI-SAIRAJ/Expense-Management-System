'use strict';

const expenseStatus = require("../enums/expenseStatus")
const expenseType = require("../enums/expenseType")


module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      expenseDate: {
        type: Sequelize.DATE
      },
      typeOfExpense: {
        type: Sequelize.ENUM,
        values:expenseStatus.values
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      resourceId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM,
        values:expenseStatus.values
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('expenses');
  }
};
