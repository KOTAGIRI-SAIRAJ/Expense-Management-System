'use strict';

const expenseStatus = require("../enums/expenseStatus")
const expenseType = require("../enums/expenseType")

module.exports = function(sequelize, DataTypes) {
  var expense = sequelize.define('expense', {
    title: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    expenseDate: DataTypes.DATE,
    expensetype:{
      type:DataTypes.ENUM,
      values:expenseType.values
    },
    projectId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER,
    status:{
      type:DataTypes.ENUM,
      values:expenseStatus.values
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return expense;
};
