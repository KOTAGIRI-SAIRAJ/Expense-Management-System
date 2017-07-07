import project_resourceController from '../controller/project_resource-controller';

export default class project_resourceRoutes {
  static init(router) {
    router
      .route('/api/project_resource')
      .get(project_resourceController.getAll)
      .post(project_resourceController.createNew);

    router
      .route('/api/project_resource/:id')
      .get(project_resourceController.getProjectAssignedByIdData);

    router
      .route('/api/project_resource/:projectId/:resourceId')
      .delete(project_resourceController.removeById);
  }
}
