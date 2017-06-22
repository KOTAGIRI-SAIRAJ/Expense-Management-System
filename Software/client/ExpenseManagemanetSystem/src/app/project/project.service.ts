/**
 * Created by semanticbits on 19/6/17.
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
export class projectService {

  constructor(private http: Http, private queryApi: QueryApi, private router: Router) {
  }
  createProject( project ): Observable<any> {
    return this.queryApi.doPost('project', project)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }
  getAllProjects(): Observable<any> {
    let project
    return this.queryApi.doGet('project', project)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || "server error")
      })
  }
  deleteTheProjectRecord(projectId): Observable<any>{
    return this.queryApi.doDelete('delProject',projectId)
      .map((res:Response)=>{
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
  getTheDataById(projectId){
    return this.queryApi.doGet('getProjectById',projectId)
      .map((res:Response)=>{
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
  updateTheProjectDetails(values){
    return this.queryApi.doPut('updateTheProjectDetails',values)
      .map((res:Response)=>{
      alert('hi');
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
}
