import resourceController from '../controller/resource-controller';

export default class resourceRoutes {
  static init(router) {
    router
      .route('/api/resource')
      .get(resourceController.getAll)
      .post(resourceController.createNew);

    router
      .route('/api/resource/:id')
      .get(resourceController.getById)
      .delete(resourceController.removeById)
      .put(resourceController.update);
  }
}
