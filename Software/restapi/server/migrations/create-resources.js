'use strict';

const roleStatus = require("../enums/role")

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      emailId: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      joinDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      role: {
        type: Sequelize.ENUM,
        values:roleStatus.values
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
    return queryInterface.dropTable('resources');
  }
};
