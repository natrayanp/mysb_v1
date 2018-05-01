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
  console.log(screen+functionality);
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
      case "SetJwt":
      {
        var apiurl=environment.SetJwtapiUrl + "/" + environment.SetJwtapiSave;
        return this.http.post(apiurl,data,{observe: 'response'});
      }
      case "RecordSignup":
      {
        var apiurl=environment.RecordSignupapiUrl + "/" + environment.RecordSignupapiSave;
        return this.http.post(apiurl,data,{observe: 'response'});
      }
      case "IFSCfetch":
      {
        var apiurl=environment.IFSCfetchapiUrl + "/" + environment.IFSCapifetch;
        return this.http.post(apiurl,data,{observe: 'response'});
      }
      case "notififetch":
      {
          var apiurl=environment.notifiapiUrl + "/" + environment.notififetch;
          return this.http.get(apiurl,{params: data,observe: 'response'});
      }
      case "registfetch":
      {
        console.log('inside reistfetc');
        var apiurl=environment.registapiUrl + "/" + environment.registfetch;
        return this.getmethod(apiurl,{observe: 'response'});
      }
      case "registfrmdetailsave":
      {
        console.log('inside regisdetlfrmsave');
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        return this.postmethod(apiurl,data,{observe: 'response'});
      }
    /*  case "registfrmdetailsave":
      {
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        this.postmethod(apiurl,data,{observe: 'response'});
      }
      case "registfrmdetailsave":
      {
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        this.postmethod(apiurl,data,{observe: 'response'});
      }
      case "registfrmdetailsave":
      {
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        this.postmethod(apiurl,data,{observe: 'response'});
      }*/
      case "registfrmsubmit":
      {
        console.log('inside registfrmsubmit');
        var apiurl=environment.registfrmapiUrl + "/" + environment.regisfrmsubmit;
        return this.postmethod(apiurl,data,{observe: 'response'});
      }
      case "pffetch":
      {
        console.log('inside pfdata fetch');
        var apiurl=environment.pfUrl + "/" + environment.pffetch;
        
        return this.getmethod(apiurl,{observe: 'response'});
        //return this.http.get('http://127.0.0.1:8000/pfdatafetch')
        //return this.http.post('http://127.0.0.1:8000/pfdatasave', JSON.stringify(pfform),{observe: 'response'});
      }
      case "pfsave":
      {
        console.log('inside pfdata save');
        var apiurl = environment.pfUrl + '/' + environment.pfsave;
        return this.http.post(apiurl, JSON.stringify(data), {observe: 'response'});
        // return this.http.post('http://127.0.0.1:8000/pfdatasave', JSON.stringify(pfform),{observe: 'response'});
      }
      case 'mforderfetch':
      {
        console.log('inside pforderdata fetch');
        var apiurl = environment.pfUrl + '/' + environment.mforderfetch;
        return this.getmethod(apiurl,{observe: 'response'});
        // return this.http.post('http://127.0.0.1:8000/pfdatasave', JSON.stringify(pfform),{observe: 'response'});
      }
      case 'fundfetch':
      {
            console.log('inside fund details fetch');
            var apiurl = environment.fundUrl + '/' + environment.fundfetch;
            return this.http.post(apiurl, JSON.stringify(data),{observe: 'response'});
      }
      case 'pfmainfetch':
      {
            console.log('inside fund details fetch');
            var apiurl = environment.pfUrl + '/' + environment.pfmainfetch;
            return this.http.post(apiurl, JSON.stringify(data),{observe: 'response'});
      }
      case 'pfexecute':
      {
            console.log('inside execute pf');
            var apiurl = environment.pfUrl + '/' + environment.executepf;
            return this.http.post(apiurl, JSON.stringify(data),{observe: 'response'});
      }
      case 'mfordersaveforlater':
      {
            console.log('inside mf order save');
            var apiurl = environment.mforderUrl + '/' + environment.mfsaveforlater;
            return this.http.post(apiurl, JSON.stringify(data),{observe: 'response'});
      }
      case 'mfordersubmit':
      {
            console.log('inside mf order submit');
            var apiurl = environment.mforderUrl + '/' + environment.mfsubmitmorder;
            return this.http.post(apiurl, JSON.stringify(data), {observe: 'response'});
      }
      case 'mfordervalidate':
      {
            console.log('inside mf order validation');
            var apiurl = environment.mforderUrl + '/' + environment.mfvalidatemorder;
            return this.http.post(apiurl, JSON.stringify(data), {observe: 'response'});
      }
      case 'mforderpayment':
      {
            console.log('inside mf order payment');
            var apiurl = environment.mforderUrl + '/' + environment.mforderpayment;
            return this.http.post(apiurl, JSON.stringify(data), {observe: 'response'});
      }
  }
}


postmethod(apiurl, data, param) {
  console.log(typeof(data));
  return this.http.post(apiurl, data, param);
}


getmethod(apiurl, param) {
  return this.http.get(apiurl, param);
}

}