'use strict';
module.exports = (sequelize, DataTypes) => {
  var project = sequelize.define('project', {
    projectName: DataTypes.STRING,
    projectDescription: DataTypes.STRING,
    projectStartDate: DataTypes.STRING,
    projectEndDate: DataTypes.STRING
  }, {
    tableName: "projects",
    underscore: true,
    classMethods: {
      associate: models => {
        project.belongsToMany(models.resources, {
          through: models.ProjectResource,
          as: "resources",
          foreignKey: {
            name: "project_id",
            allowNull: false
          }
        });
      }
    }
  });
  return project;
};
