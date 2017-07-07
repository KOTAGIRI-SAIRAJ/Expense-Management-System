import Promise from "bluebird";
import models from "../../../../server/models"
import roleStatus from "../../../enums/role"


export default class resourceDAO {

  static createNew(request, res) {
    return new Promise((resolve, reject) => {
      models.project.findById(request.projectId).then(projec => {
        models.resources.findById(request.resourceId).then(reso => {
          projec.addResources([reso]).then((result) => {
              resolve(result);
          })
        })
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

  static getProjectAssignedByIdData(queryParams) {
    return new Promise((resolve, reject) => {
      models.ProjectResource
        .findAll({
          include: [
            {model:models.resources},
            {model:models.project,
              where:{id: queryParams},
            }
          ]
        })
        .then(result => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  static removeById(request){
    return new Promise((resolve, reject)=>{
      models.project.findById(request.projectId).then(projec => {
        projec.getResources({where: {id: request.resourceId}}).then((resoc)=> {
          models.resources.findById(request.resourceId).then(reso => {
            projec.removeResources([reso]).then((result) => {
              if (result === 0) {
                reject(404)
              }
              resolve(204);
            }, (error) => {
              reject(error)
            })
          })
        })
      }, (error) => {
        reject(error);
      });
    })
  }

}
