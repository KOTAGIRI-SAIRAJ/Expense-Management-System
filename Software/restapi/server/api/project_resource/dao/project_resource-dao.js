import Promise from 'bluebird';
import models from "../../../../server/models"

export default class project_resourceDAO{

  static createNew(request,res) {
    return new Promise((resolve, reject) => {
      models.ProjectResource
        .create({
          project_id: request.projectId,
          resource_id: request.resourceId,
        }).then(result => {
              resolve(result)
        })
        .catch(error => {
          console.log(error)
        });
    });
  }

  static getAll(queryParams) {
    return new Promise((resolve, reject) => {
      models.ProjectResource
        .findAll({})
        .then(result => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }
}
