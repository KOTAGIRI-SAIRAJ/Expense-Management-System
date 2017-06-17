import projectController from '../controller/project-controller';

export default class projectRoutes {
  static init(router) {
    router
      .route('/api/project')
      .get(projectController.getAll)
      .post(projectController.createNew);

    router
      .route('/api/project/:id')
      .get(projectController.getById)
      .delete(projectController.removeById)
      .put(projectController.update);
  }
}
