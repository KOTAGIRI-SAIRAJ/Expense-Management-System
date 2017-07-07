import Promise from "bluebird";
import models from "../../../../server/models"
import roleStatus from "../../../enums/role"


export default class resourceDAO{

  static createNew(request,res) {
    return new Promise((resolve, reject) => {
      models.project.findById(request.projectId).then(projec=>{
        models.resources.findById(request.resourceId).then(reso=>{
          projec.setResources([reso]).then(()=>{})
        })
      })
        .catch(error => {
          console.log(error)
        });
    });
  }



}
