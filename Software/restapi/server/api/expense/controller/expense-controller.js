import expenseDAO from '../dao/expense-dao';

export default class expenseController {

  static getAll(req, res) {
    const _query = req.query;
    expenseDAO
      .getAll(_query)
      .then(result => {
        res.send(result);
      })
      .catch(error => res.status(400).json(error));
  }


  static createNew(req, res) {
    const _reqBody = req.body;
    expenseDAO
      .createNew(_reqBody)
      .then(newuserss => {
        res.send(newuserss);
      })
      .catch(error => {
        console.log(error);
      });
  }


  static update(req, res) {
    const _reqBody = req.body;
    const _reqParmaId  = req.params.id;
    expenseDAO
      .update(_reqBody,_reqParmaId)
      .then(newuserss => {

        res.send(newuserss);
      })
      .catch(error => {
        console.log(error);
      });
  }

  static getById(req, res) {
    const _query = req.params.id;

    expenseDAO
      .getById(_query)
      .then(newusers => {

        res.send(newusers);
      })
      .catch(error => {
        if (error === 404) {
          return res.status(404)
        }
        res.status(400).json(error);
      });
  }

  static removeById(req, res) {
    const _id = req.params.id;
    expenseDAO
      .removeById(_id)
      .then(() => res.send('Deleted Sucessfully'))
      .catch(error => {
        if (error === 404) {
          return res.status(404)
        }
        res.status(400).json(error);
      });
  }
}
