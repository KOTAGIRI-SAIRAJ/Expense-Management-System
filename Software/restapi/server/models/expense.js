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
      values:expenseStatus.values
    },
    status:{
      type:DataTypes.ENUM,
      values:expenseStatus.values
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        expense.hasMany(models.project,{
          foreignKey:{
            projectId:"id"
          },
          onDelete: "CASCADE"
        })
        expense.hasMany(models.resources,{
          foreignKey:{
            resourceId:"id"
          },
          onDelete: "CASCADE"
        })
      }
      }
  });
  return expense;
};
