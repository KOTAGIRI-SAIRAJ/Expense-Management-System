/**
 * Created by semanticbit on 20/6/17.
 */
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

export class RequestUtils {

  static getRequestOptions( params ): RequestOptions {
    const urlParams: URLSearchParams = new URLSearchParams();
    Object.keys(params).map((key) => {
      urlParams.set(key, params[key]);
      return;
    });
    const requestOptions = new RequestOptions();
    requestOptions.search = urlParams;
    return requestOptions;
  }

  constructor() {}
}
