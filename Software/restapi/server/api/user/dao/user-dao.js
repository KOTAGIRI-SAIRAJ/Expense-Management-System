import Promise from "bluebird";
import models from "../../../../server/models"


export default class userDAO{

  static getAll(queryParams) {
    return new Promise((resolve, reject) => {
      models.user
        .findAll({})
        .then(result => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }

  static getById(queryParams) {
    let date = new Date(queryParams);
    date = new Date(date.getYear(),date.getMonth(),date.getDate()+1);
    return new Promise((resolve, reject) => {
      const _query = queryParams;
      if (date instanceof Date && !isNaN(date.valueOf())) {
        models.user
          .find({where: {$or: [{DOB: date}]}})
          .then(result => {
            resolve(result);
          }, (error) => {

            reject(error);
          });
      } else {
        queryParams = '%' + queryParams + '%';
        models.user
          .find({where: {$or: [{firstname: {$ilike: queryParams}}, {lastname: {$ilike: queryParams}}]}})
          .then(result => {
            resolve(result);
          }, (error) => {

            reject(error);
          });
      }
    });
  }

  static createNew(request,res) {
    return new Promise((resolve, reject) => {
      let _reqBody = request;
      let date = new Date(_reqBody.DOB);
      date = new Date(date.getYear(),date.getMonth(),date.getDate()+1);
      models.user.create({
        firstname: _reqBody.firstname,
        lastname: _reqBody.lastname,
        DOB: date,
        emailId: _reqBody.emailId,
        password: _reqBody.password
      }).then(result => {
        resolve(result)
      })
        .catch(error => {
          console.log(error)
        });
    });
  }


  static update(_reqBody,_reqParamId) {
    return new Promise((resolve, reject) => {
      models.user.update({
          firstname: _reqBody.firstname,
          lastname: _reqBody.lastname,
          DOB: _reqBody.DOB,
          emailId: _reqBody.emailId,
          password: _reqBody.password
        },
        { where: { id: _reqParamId}, returning: true, plain:true}
      ).then((result) => {
        /*console.log(result[1].dataValues);*/
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

