/**
 * Created by semanticbit on 20/6/17.
 */
import { environment } from './../../../environments/environment';

export const user = 'user';
export const project = 'project';


export const ClientEndPoint= (type: string, params: any) => {
  console.log(type);
  switch (type) {
    case user:
      return environment.API_ROOT + '/api/user';
    case project :
      return environment.API_ROOT + '/api/project';
    /*case user:
      return environment.API_ROOT + '/api/user/'+params*/
  }
}
