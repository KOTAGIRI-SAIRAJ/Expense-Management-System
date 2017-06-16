import TodoRoutes from "../api/todo/route/todo-route";


export default class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     

     app.use("/", router);
   }
}
