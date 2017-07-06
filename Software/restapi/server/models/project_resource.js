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
            name: "ProjectId",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        ProjectResource.belongsTo(models.resources, {
          foreignKey: {
            name: "ResourceId",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      }
    }
  });
  return ProjectResource;
};
