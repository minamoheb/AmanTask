import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalApiService {
  constructor(private http: HttpClient) { }


  CheckConfirmDeletePass(pass): Observable<any> {
    let param = new HttpParams();
    param = param.append('pass', pass);
    const result = this.http.get(environment.API_URL + 'GlobalApi/CheckDeletePass', { params: param });
    console.log('CheckDeletePass request sent');
    return result;
  }


}
