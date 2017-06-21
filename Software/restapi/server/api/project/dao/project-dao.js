import Promise from "bluebird";
import models from "../../../../server/models"


export default class projectDAO{

  static getAll(queryParams) {
    console.log("from getAll")
    return new Promise((resolve, reject) => {
      models.project
        .findAndCountAll({})
        .then(result => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  static getById(queryParams) {
    console.log("from getById")
    return new Promise((resolve, reject) => {
      const _query = queryParams;
      models.project
        .findAll({where:{$or:[{projectName : queryParams}]}})
        .then(result => {
          resolve(result);
        }, (error) => {
          logger.error(`Internal error while retrieving client: ${error}`);
          reject(error);
        });
    });
  }

  static createNew(request,res) {
    return new Promise((resolve, reject) => {
      models.project
        .create({
          projectName: request.projectName,
          projectDescription: request.projectDescription,
          projectStartDate: request.projectStartDate,
          projectEndDate: request.projectEndDate
    }).then(result => {
        resolve(result)
      })
        .catch(error => {
          console.log(error)
        });;
    });
  }

  static update(_reqBody,_reqParamId) {
    return new Promise((resolve, reject) => {
      models.project
        .update({
            projectName: _reqBody.projectName,
            projectDescription: _reqBody.projectDescription,
            projectStartDate: _reqBody.projectStartDate,
            projectEndDate: _reqBody.projectEndDate
          },
          { where: { id: _reqParamId}, returning: true, plain:true}
        ).then((result) => {
        console.log(result[1].dataValues);
        resolve(result[1].dataValues);
      }, (error) => {
        reject(error);
      });
    });
  }

  static removeById(_id) {
    return new Promise((resolve, reject) => {
      models.project
        .findById(_id)
        .then(result => {
          if (!result) {
            return reject(404);
          }
          return result
            .destroy()
            .then(() => { resolve(204); }, (error) => reject(error));
        }, (error) => {
          logger.error(`Internal error while deleting client: ${error}`);
          reject(error);
        });
    });
  }

}
