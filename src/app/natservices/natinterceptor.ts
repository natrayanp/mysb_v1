import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class NatInterceptor implements HttpInterceptor{

  TknAddSites=[];
  nocontentsetsites=[];
  tosettkn = false;
  authReq:any;
  authHeader:any;
  contentset=true;

  constructor() {
    this.TknAddSites=environment.TknAddSites;
  }
  
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //code to be added to ensure the bearer token is added only for certain urls
    console.log(req.url);
    this.tosettkn = true;
    this.TknAddSites.forEach(
        element => { if(req.url.startsWith(element)){
                      this.tosettkn=false;                      
                    }
                    });
                  
    
    
    if(req.url.endsWith('uploadfile')){
      console.log("inside uploadfile content set");
      this.contentset=false;
    }

    if(req.url.endsWith('mforderpayment')){
      console.log("inside mforderpayment content set");
      this.responseType='text/html';
    }

              
    console.log("set toke?:",this.tosettkn);
    console.log("set content?:",this.contentset);
    if(this.tosettkn || !(req.url.endsWith('mforderpayment'))) {
        // Get the auth header from the service.
        this.authHeader = localStorage.getItem("natjwt");;
        // Clone the request to add the new header.
              if(this.contentset){
                  this.authReq = req.clone({headers: req.headers.set("Authorization", ("Bearer "+ this.authHeader))
                                                                .set("Content-Type","application/json")});
                                                            //*.set("Content-Type","multipart/form-data")});
                  //const authReq = req.clone({setHeaders: {'Content-Type': "application/*"}});
              } else{
                //This is required for fileupload without this the content set is not correct
                console.log("inside else where no content type is set");
                  this.authReq = req.clone({headers: req.headers.set("Authorization", ("Bearer "+ this.authHeader))});
              }
        console.log(this.authReq);
        console.log(this.authReq.url);  
        // Pass on the cloned request instead of the original request.
        return next.handle(this.authReq);
    }

     // Use this to pass original request
     return next.handle(req);
   }
 }
