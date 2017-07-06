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
            name: "ProjectId",
            allowNull: false
          }
        });
        project.hasMany(models.expense, {
          as: "expenses",
          foreignKey: {
            name: "projectId",
            allowNull: false
          }
        });
      }
    }
  });
  return project;
};
