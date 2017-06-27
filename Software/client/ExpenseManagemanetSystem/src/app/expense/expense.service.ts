/**
 * Created by semanticbits on 23/6/17.
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
export class expenseService {

  constructor(private http: Http, private queryApi: QueryApi, private router: Router) {
  }
  createExpense(expenseValues): Observable<any> {
    return this.queryApi.doPost('expense',expenseValues)
      .map((res:Response)=>{
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
  getAllExpenses(){
    let expenseValues
    return this.queryApi.doGet('expense',expenseValues)
      .map((res:Response)=>{
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
  updateExpenses(values){
    return this.queryApi.doPut('expense',values)
      .map((res:Response)=>{
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
  getTheDataById(idvalue){
    return this.queryApi.doGet('expense',idvalue)
      .map((res:Response)=>{
        return res.json();
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
  deleteTheExpenseRecord(values){
    return this.queryApi.doDelete('expense',values)
      .map((res:Response)=>{
        return res;
      })
      .catch((error:any)=>{
        return Observable.throw(error.json());
      })
  }
}
