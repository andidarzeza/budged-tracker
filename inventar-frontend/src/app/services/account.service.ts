import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverAPIURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly API_URl: string = `${serverAPIURL}/api/account`;

  constructor(public http: HttpClient) {
    
  }

  getAccount(): Observable<any> {
    return this.http.get(this.API_URl, {observe: 'response'});
  }
}
