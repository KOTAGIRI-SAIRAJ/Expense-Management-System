'use strict';
module.exports = function(sequelize, DataTypes) {
  var project = sequelize.define('project', {
    projectName: DataTypes.STRING,
    projectDescription: DataTypes.STRING,
    projectStartDate: DataTypes.STRING,
    projectEndDate: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return project;
};
