import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable()
export class SettingspfService {

  constructor(private http: HttpClient) { }

  servicepfdata:number=0;
  userdata={};

  savepf(pfform){

    //const natheaders = new HttpHeaders().set('natheader', 'application/json');
    
    return this.http.post('http://127.0.0.1:8000/pfdatasave', JSON.stringify(pfform),{observe: 'response'});
    //this.setjwtserviceservice.login(this.name,this.password)
        //.map(res => {return (res);})  
  }

  getpf(){
  return this.http.get('http://127.0.0.1:8000/pfdatafetch')
  //.map(data => data);
 /* .subscribe(data => 
    {
      this.servicepfdata =<any[]>data;
      console.log("inside service this.servicepfdata");
      console.log(this.servicepfdata);
    }
  );*/
  }

  addsdtest(){
    this.servicepfdata = this.servicepfdata+10;
  }


}
