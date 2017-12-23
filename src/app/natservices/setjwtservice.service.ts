import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import 'rxjs/add/operator/map'

@Injectable()
export class SetjwtService {

  public token: string;
  
    constructor(private http: HttpClient) { }
  
    login(natkey) {
      
      return this.http.post('http://127.0.0.1:8000/natkeys', { natkey: natkey })
      //this.setjwtserviceservice.login(this.name,this.password)
         // .map(res => {return (res);})                    
    
  }
  
  
  
  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
  }

}
