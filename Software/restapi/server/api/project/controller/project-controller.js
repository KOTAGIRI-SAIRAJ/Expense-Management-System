import projectDAO from '../dao/project-dao';

export default class projectController {
  static getAll(req, res) {
    const _query = req.query;
    projectDAO
      .getAll(_query)
      .then(result => {
        res.send(result);
      })
      .catch(error => res.status(400).json(error));
  }


  static createNew(req, res) {

    const _reqBody = req.body;
    projectDAO
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
    projectDAO
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
    projectDAO
      .getById(_query)
      .then(newusers => {
        console.log(newusers)
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
    projectDAO
      .removeById(_id)
      .then(() => res.status(204).end())
      .catch(error => {
        if (error === 404) {
          return res.status(404)
        }
        res.status(400).json(error);
      });
  }
}
