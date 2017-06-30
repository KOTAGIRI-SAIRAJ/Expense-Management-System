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
    tableName: "expenses",
    underscore: true,
    classMethods: {
      associate: models => {
        expense.belongsTo(models.project, {
          foreignKey: {
            name: "projectId",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        expense.belongsTo(models.resources, {
          foreignKey: {
            name: "resourceId",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      }
    }
  });
  return expense;
};
