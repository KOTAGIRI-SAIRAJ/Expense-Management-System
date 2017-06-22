/**
 * Created by semanticbit on 20/6/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {ClientEndPoint} from './../../common/request/ClientEndPoint';


@Injectable()
export class QueryApi {

  constructor(private http: Http) {
  }

  doGet(url: string, params: any) {
    url = ClientEndPoint(url, params);
    return this.http.get(url, params );
  }

  doPost(url: string, params: any) {
    url = ClientEndPoint(url, params);
    return this.http.post(url, params );
  }

  doDelete(url: string, params: any) {
    url = ClientEndPoint(url, params);
    return this.http.delete(url, params);
  }
  doPut(url: string, params: any) {
    url = ClientEndPoint(url, params);
    return this.http.put(url, params);
  }
}
