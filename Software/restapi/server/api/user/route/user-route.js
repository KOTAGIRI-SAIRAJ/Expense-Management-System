import userController from '../controller/user-controller';

export default class userRoutes {
  static init(router) {
    router
      .route('/api/user')
      .get(userController.getAll)
      .post(userController.createNew);

    router
      .route('/api/user/:id')
      .get(userController.getById)
      .delete(userController.removeById)
      .put(userController.update);
  }
}
