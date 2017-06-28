import project_resourceController from '../controller/project_resource-controller';

export default class project_resourceRoutes {
  static init(router) {
    router
      .route('/api/project/:projectId/resource/:resourceId')
      .post(project_resourceController.createNew);

    router
      .route('/api/projects/resources')
      .get(project_resourceController.getAll)

    router
      .route('/api/project_resource/:id')
      .delete(project_resourceController.removeById);
  }
}
