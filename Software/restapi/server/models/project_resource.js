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
            name: "project_id",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        ProjectResource.belongsTo(models.resources, {
          foreignKey: {
            name: "resource_id",
            allowNull: false
          },
          onDelete: "CASCADE"
        });
      }
    }
  });
  return ProjectResource;
};
