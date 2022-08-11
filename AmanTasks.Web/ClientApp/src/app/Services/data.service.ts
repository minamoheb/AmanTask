import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';    
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public httpClient: HttpClient) { }
  get(apiPath: string): Observable<any> {
    return this.httpClient.get(`${environment.API_URL}${apiPath}`);
  }
  getWithParams(apiPath: string, params: any): Observable<any>  {
    return this.httpClient.get(`${environment.API_URL}${apiPath}`, { params });
  }
  delete(apiPath: string, key: any): Observable<any> {
    return this.httpClient.delete(`${environment.API_URL}${apiPath}/${key}`);
  }
  deleteWithParams(apiPath: string, params: any): Observable<any> {
    return this.httpClient.delete(`${environment.API_URL}${apiPath}`, { params });
  }

  put(apiPath: string, model: any): Observable<any> {
    return this.httpClient.put(`${environment.API_URL}${apiPath}`, model);
  }

  post(apiPath: string, model: any): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}${apiPath}`, model);
  }
 

}
