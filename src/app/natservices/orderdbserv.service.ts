import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class OrderdbservService {

  constructor(private http: HttpClient) { }

  pfnames:string[];
  getonlypf(){
    return this.http.get('http://127.0.0.1:8000/onlypf')
    //.map(data => data);
   /* .subscribe(data => 
      {
        this.pfnames =<any[]>data;
        console.log("inside service this.pfnames");
        console.log(this.pfnames);
      }
    );*/
    }

}
