import expenseController from '../controller/expense-controller';

export default class expenseRoutes {
  static init(router) {
    router
      .route('/api/expense')
      .get(expenseController.getAll)
      .post(expenseController.createNew);

    router
      .route('/api/expense/:id')
      .get(expenseController.getById)
      .delete(expenseController.removeById)
      .put(expenseController.update);

    router
      .route('/api/getDetailsManager')
      .get(expenseController.getDetailsManager)
  }
}
