'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectResource = sequelize.define("ProjectResource", {

  }, {
    tableName: "project_resources",
    underscore: true,
    classMethods: {
      associate: models => {
        ProjectResource.belongsTo(models.project, {
          foreignKey: {
            name: "projectId",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        ProjectResource.belongsTo(models.resources, {
          foreignKey: {
            name: "resourceId",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      }
    }
  });
  return ProjectResource;
};
