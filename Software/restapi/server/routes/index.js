import userRoutes from "../api/user/route/user-route"
import resourceRoutes from "../api/resource/route/resource-route"
import projectRoutes from "../api/project/route/project-route"
import expenseRoutes from "../api/expense/route/expense-route"
import project_resourceRoutes from "../api/project_resource/route/project_resource-route"


export default class Routes {
   static
   init(app, router) {

     userRoutes.init(router);

     resourceRoutes.init(router);

     projectRoutes.init(router);

     expenseRoutes.init(router);

     project_resourceRoutes.init(router);

     app.get("/api",(req,res)=> res.status(200).send({
       message:"Welcome SaiRaj"
     }))

     app.use("/", router);
   }
}
