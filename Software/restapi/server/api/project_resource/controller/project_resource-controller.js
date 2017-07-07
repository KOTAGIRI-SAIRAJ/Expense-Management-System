import project_resourceDAO from '../dao/project_resource-dao';

export default class project_resourceController {

  static getAll(req, res) {
    project_resourceDAO
      .getAll()
      .then(project_resources => res.status(200).json(project_resources))
      .catch(error => res.status(400).json(error));
  }

  static createNew(req, res) {
    let _project_resource = req.body;
    project_resourceDAO
      .createNew(_project_resource)
      .then(project_resource => res.status(201).json(project_resource))
      .catch(error => res.status(400).json(error));
  }

  static removeById(req, res) {
    let _id = req.params;
    project_resourceDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }


  static getProjectAssignedByIdData(req, res) {
    let _id = req.params.id;
    project_resourceDAO
      .getProjectAssignedByIdData(_id)
      .then(project_resources => res.status(200).json(project_resources))
      .catch(error => res.status(400).json(error));
  }
}
