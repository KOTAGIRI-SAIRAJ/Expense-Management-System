/**
 * Created by semanticbit on 20/6/17.
 */
import { environment } from './../../../environments/environment';

export const user = 'user';


export const ClientEndPoint= (type: string, params: any) => {
  switch (type) {
    case user:
      return environment.API_ROOT + '/api/user';
    /*case user:
      return environment.API_ROOT + '/api/user/'+params*/
  }
}
