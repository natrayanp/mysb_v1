import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest} from '@angular/common/http';


import { environment } from '../../environments/environment';

@Injectable()
export class DbservicesService {

  constructor(private http: HttpClient) { }
  apiurl:string;
  action:string;  
  location: string;




dbaction(screen,functionality,data){
  console.log("inside dbaction");
  switch (screen+functionality) {
    case "FundAllocFetch":
      {
        var apiurl=environment.FundAllocapiUrl + "/" + environment.FundAllocfetch;
        console.log(apiurl);
        return this.http.get(apiurl);
      }
      case "FundAllocSave":
      {
        var apiurl=environment.FundAllocapiUrl + "/" + environment.FundAllocSave;
        return this.http.post(apiurl, JSON.stringify(data),{observe: 'response'});
      }
      case "ClientCreation":
      {
        var apiurl=environment.bsecustUrl + "/" + environment.bseCustcreate;
        return this.http.get(apiurl);
      }
      case "MandateCreation":
      {
        var apiurl=environment.bsemandatetUrl + "/" + environment.bseMandataecreate;
        return this.http.get(apiurl);
      }
  }
}


}