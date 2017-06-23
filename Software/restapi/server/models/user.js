'use strict';
const roleStatus = require("../enums/role")
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    DOB: DataTypes.DATE,
    emailId: DataTypes.STRING,
    password: DataTypes.STRING,
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
  return user;
};
