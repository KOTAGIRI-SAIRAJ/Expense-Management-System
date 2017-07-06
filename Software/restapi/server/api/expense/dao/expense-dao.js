import Promise from "bluebird";
import models from "../../../../server/models"
import expenseStatus from "../../../enums/expenseStatus"
import expenseType from "../../../enums/expenseType"


export default class expenseDAO{

  static getAll(queryParams) {
    return new Promise((resolve, reject) => {
      models.expense
        .findAll({
          include: [
            {model:models.resources}
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
      models.expense
        .findAll({where:{$or:[{id : queryParams}]}})
        .then(result => {
          resolve(result);
        }, (error) => {

          reject(error);
        });
    });
  }

  static createNew(request,res) {
    return new Promise((resolve, reject) => {
      let _reqBody = request;
      /*let date = new Date(_reqBody.expenseDate);
       date = new Date(date.getYear(),date.getMonth(),date.getDate()+1);*/
      models.expense
        .create({
          title: _reqBody.title,
          amount: _reqBody.amount,
          expenseDate: _reqBody.expenseDate,
          expensetype:expenseType[_reqBody.expensetype].value,
          projectId: _reqBody.projectId,
          resourceId: _reqBody.resourceId,
          status:expenseStatus[_reqBody.status].value
        }).then(result => {
        resolve(result)
      })
        .catch(error => {
          console.log(error)
        });
    });
  }

  static update(request,_reqParamId) {
    let _reqBody = request;
    /*let date = new Date(_reqBody.expenseDate);
     date = new Date(date.getYear(),date.getMonth(),date.getDate()+1);*/
    return new Promise((resolve, reject) => {
      models.expense
        .update({
            title: _reqBody.title,
            amount: _reqBody.amount,
            expenseDate: _reqBody.expenseDate,
            expensetype:expenseType[_reqBody.expensetype].value,
            projectId: _reqBody.projectId,
            resourceId: _reqBody.resourceId,
            status:expenseStatus[_reqBody.status].value
          },
          { where: { id: _reqParamId}, returning: true, plain:true}
        ).then((result) => {

        resolve(result[1].dataValues);
      }, (error) => {
        reject(error);
      });
    });
  }

  static removeById(_id) {
    return new Promise((resolve, reject) => {
      models.expense
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

  static getDetailsManager(queryParams) {
    return new Promise((resolve, reject) => {
      models.expense
        .findAll({where:{resourceId:{$in:[('SELECT id FROM resources WHERE role != \'Manager\'')]}}})
        .then(result => {
          console.log(result);
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
  }
}

