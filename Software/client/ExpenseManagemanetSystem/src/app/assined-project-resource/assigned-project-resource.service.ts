/**
 * Created by semanticbits on 28/6/17.
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
export class projectResourceService {

  constructor(private http: Http, private queryApi: QueryApi, private router: Router) {
  }
  createProject(data): Observable<any> {
    return this.queryApi.doPost('projectResource',data)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }
  getAllProjectResources(): Observable<any> {
    let data
    return this.queryApi.doGet('projectResource', data)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || "server error")
    })
  }
  getAllProjectResourcesById(val):Observable<any>{
    return this.queryApi.doGet('projectResource',val)
      .map((res:Response)=>{

        return res.json();
      })
      .catch((error:any)=>{
        console.log(error)
        return Observable.throw(error.json());
      })
  }
  deleteTheProjectResource(val):Observable<any>{
    return this.queryApi.doDelete('projectResource',val)
      .map((res:Response)=>{
        console.log(res);
        return res.status;
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
}
