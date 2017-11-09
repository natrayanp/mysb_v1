import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NatInterceptor implements HttpInterceptor{

  TknAddSites=["http://127.0.0.1:8001","http://127.0.0.1:8000"];
  tosettkn = false;


  constructor() {}
  
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //code to be added to ensure the bearer token is added only for certain urls
    console.log(req.url);
    this.tosettkn = false;
    this.TknAddSites.forEach(
        element => { if(req.url.startsWith(element)){
                      this.tosettkn=true;                      
                    } 
                    });
    
    console.log(this.tosettkn);

    if(this.tosettkn){
     // Get the auth header from the service.
     const authHeader = localStorage.getItem("natjwt");;
     // Clone the request to add the new header.
     const authReq = req.clone({headers: req.headers.set("Authorization", ("Bearer "+ authHeader))
                                                    .set("Content-Type","application/json")});
     //const authReq = req.clone({setHeaders: {'Content-Type': "application/*"}});
     console.log(authReq);
     console.log(authReq.url);
     // Pass on the cloned request instead of the original request.
     return next.handle(authReq);
    }

     // Use this to pass original request
     return next.handle(req);
   }
 }