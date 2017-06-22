import Promise from "bluebird";
import models from "../../../../server/models"
import roleStatus from "../../../enums/role"


export default class resourceDAO{

  static getAll(queryParams) {
    return new Promise((resolve, reject) => {
      models.resources
        .findAll({})
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
      models.resources
        .findAll({where:{$or:[{firstName : queryParams}, { lastName : queryParams}]}})
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
      let _reqBody = request;
      models.resources
        .create({
          firstName: _reqBody.firstName,
          lastName: _reqBody.lastName,
          DOB: _reqBody.DOB,
          emailId: _reqBody.emailId,
          password : _reqBody.password,
          joinDate : _reqBody.joinDate,
          endDate : _reqBody.endDate,
          role: roleStatus[_reqBody.role].value
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
      models.resources
        .update({
            firstName: _reqBody.firstName,
            lastName: _reqBody.lastName,
            DOB: _reqBody.DOB,
            emailId: _reqBody.emailId,
            password : _reqBody.password,
            joinDate : _reqBody.joinDate,
            endDate : _reqBody.endDate,
            role: roleStatus[_reqBody.role].value
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
      models.resources
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
