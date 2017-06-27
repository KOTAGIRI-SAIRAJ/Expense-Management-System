/**
 * Created by semanticbit on 20/6/17.
 */
import { environment } from './../../../environments/environment';
import {isUndefined} from "util";

export const user = 'user';
export const project = 'project';
export const expense= 'expense';
export const resource = 'resource';
export const delProject = 'delProject';
export const delResource = 'delResource';
export const getProjectById = 'getProjectById';
export const getResourceById = 'getResourceById';
export const updateTheProjectDetails = 'updateTheProjectDetails';
export const updateTheResourceDetails = 'updateTheResourceDetails';



export const ClientEndPoint= (type: string, params: any) => {

  switch (type) {
    case user:
      return environment.API_ROOT + '/api/user';
    case project :
      return environment.API_ROOT + '/api/project';
    case resource :
      return environment.API_ROOT + '/api/resource';
    case expense:
      if(params != null ){
        if(typeof params === 'string' || params instanceof String){
          return environment.API_ROOT + '/api/expense/'+params;
        }else if( typeof params === 'object' && params.hasOwnProperty('id') ){
          return environment.API_ROOT + '/api/expense/' + params.id;
        }else {
          return environment.API_ROOT + '/api/expense'
        }
      } else {
        return environment.API_ROOT + '/api/expense'
      }
    case delProject:
      return environment.API_ROOT + '/api/project/'+params;
    case delResource:
      return environment.API_ROOT + '/api/resource/'+params;
    case getProjectById:
      return environment.API_ROOT + '/api/project/'+params;
    case getResourceById:
      return environment.API_ROOT + '/api/resource/'+params;
    case updateTheProjectDetails:
      return environment.API_ROOT + '/api/project/' + params.id;
    case updateTheResourceDetails:
      return environment.API_ROOT + '/api/resource/' + params.id;
  }
}

