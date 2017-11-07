import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationService implements HttpInterceptor{

  constructor() {}
  
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // Get the auth header from the service.
     //const authHeader = this.auth.getAuthorizationHeader();
     // Clone the request to add the new header.
     //const authReq = req.clone({headers: req.headers.set('content-type', "application/json")});
     //const authReq = req.clone({setHeaders: {'Content-Type': "application/*"}});
     //console.log(authReq);
     // Pass on the cloned request instead of the original request.
     return next.handle(req);
   }
 }
