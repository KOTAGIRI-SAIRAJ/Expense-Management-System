'use strict';
const roleStatus = require("../enums/role")
module.exports = function(sequelize, DataTypes) {
  var resources = sequelize.define('resources', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
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
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return resources;
};
