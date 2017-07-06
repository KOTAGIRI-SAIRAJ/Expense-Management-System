'use strict';
const roleStatus = require("../enums/role")
module.exports = (sequelize, DataTypes) => {
  var resources = sequelize.define('resources', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    DOB: DataTypes.DATE,
    emailId: DataTypes.STRING,
    password: DataTypes.STRING,
    joinDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    role:{
      type:DataTypes.ENUM,
      values:roleStatus.values
    }
  }, {
    tableName: "resources",
    underscore: true,
    classMethods: {
      associate: models => {
        resources.belongsToMany(models.project, {
          through: models.ProjectResource,
          as: "projects",
          foreignKey: {
            name: "ResourceId",
            allowNull: false
          }
        });
        resources.hasMany(models.expense, {
          as: "expenses",
          foreignKey: {
            name: "resourceId",
            allowNull: false
          }
        });
      }
    }
  });
  return resources;
};
