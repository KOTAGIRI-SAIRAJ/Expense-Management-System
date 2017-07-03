import Promise from 'bluebird';
import models from "../../../../server/models"

export default class project_resourceDAO{

  static createNew(request,res) {
    return new Promise((resolve, reject) => {
      models.ProjectResource
        .create({
          projectId: request.projectId,
          resourceId: request.resourceId,
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
        .findAll({
          include: [
            {model:models.resources},
            {model:models.project}
          ]
        })
        .then(result => {

          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }
  static getById(queryParams) {
    return new Promise((resolve, reject) => {
      const _query = queryParams;
      models.ProjectResource
        .findAll({
          include: [
            {model:models.resources},
            {model:models.project}
          ],
          where:{$or:[{ projectId : queryParams}]}
        })
        .then(result => {
          console.log(result);
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  static removeById(_id) {
    return new Promise((resolve, reject) => {
      models.ProjectResource
        .find({where:{$or:[{resourceId:_id.projectId},{resourceId:_id.resourceId}]}})
        .then(result => {
          if (!result) {
            return reject(404);
          }
          return result
            .destroy()
            .then(() => { resolve(204); }, (error) => reject(error));
        }, (error) => {
          reject(error);
        });
    });
  }
}
