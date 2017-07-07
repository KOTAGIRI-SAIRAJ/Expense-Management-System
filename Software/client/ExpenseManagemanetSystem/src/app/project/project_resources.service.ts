/**
 * Created by semanticbits on 7/7/17.
 */

import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { RequestUtils } from '../common/request/RequestUtils';
import { QueryApi } from '../common/request/QueryApi';


@Injectable()
export class ProjectResourcesService {

  constructor(private http: Http, private queryApi: QueryApi, private router: Router) {
  }
  createProjectResource(data): Observable<any> {
    return this.queryApi.doPost('projectResources',data)
      .map((res: Response) => {

        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getAllTheRecords(){
    let data
    return this.queryApi.doGet('projectResources',data)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getTheDataByProjectId(data){
    return this.queryApi.doGet('projectResources',data)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  deleteTheProjectResourceRecord(data){
    return this.queryApi.doDelete('delProjectResource',data)
      .map((res:Response)=>{
        return res;
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
}
