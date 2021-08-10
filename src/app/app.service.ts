import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( public http: HttpClient,
    ) { }
  get(endpoint:string,params?: any,reqOpts?: any){
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    } 
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return new Promise<any>(resolve => {
      this.http.get(environment.apiUrl + endpoint,
          {
            params: reqOpts.params,
            headers: {'Content-Type': 'application/json','Origin': 'https://instacred.me'},
          })
          .subscribe(data => {
            resolve(data);
          }, err => {
            resolve(err);
          });
    });
  }
  post(endpoint: string,body:any,params?: any,reqOpts?: any){
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    } 
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return new Promise<any>(resolve => {
      this.http.post(environment.apiUrl + endpoint,body,
          {
            params: reqOpts.params,
            headers: {},
          })
          .subscribe(data => {
            resolve(data);
          }, err => {
            resolve(err);
          });
    });
  }
}
