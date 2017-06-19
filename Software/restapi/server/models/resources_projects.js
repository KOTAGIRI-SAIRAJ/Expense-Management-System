'use strict';
module.exports = function(sequelize, DataTypes) {
  var resources_projects = sequelize.define('resources_projects', {
    projectId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER
  }, {
    classMethods: {
      // associations can be defined here
      associate: function(models)  {
        resources_projects.hasMany(models.project,{
          foreignKey:{
            projectId:"id"
          },
          onDelete: "CASCADE"
        })
        resources_projects.hasMany(models.resources,{
          foreignKey:{
            resourceId:"id"
          },
          onDelete: "CASCADE"
        })
      }
    }
  });
  return resources_projects;
};
