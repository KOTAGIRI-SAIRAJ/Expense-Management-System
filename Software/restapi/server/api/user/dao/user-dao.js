import Promise from "bluebird";
import models from "../../../../server/models"


export default class userDAO{

  static getAll(queryParams) {
    return new Promise((resolve, reject) => {
      models.user
        .findAndCountAll({})
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
      models.user
        .find({where:{$or:[{firstname : queryParams}, { lastname : queryParams}]}})
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
      models.user.create({
        firstname: _reqBody.firstname,
        lastname: _reqBody.lastname,
        DOB: _reqBody.DOB
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
      models.user.update({
          firstname: _reqBody.firstname,
          lastname: _reqBody.lastname,
          DOB: _reqBody.DOB
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
      models.user
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

