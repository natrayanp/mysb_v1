import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class FileuploadService {constructor(private http: HttpClient) { }


// file from event.target.files[0]
uploadFile(file: File,filetype: string): Observable<HttpEvent<any>> {
  console.log("inside service"+file);  
  var filtypewspc=filetype.replace(/\s/g,'');
  var filename=filtypewspc+'.tiff';
  const formDatass = new FormData();
  formDatass.append('selectFile', file,filename);

  console.log("get formdata upload");
  console.log(formDatass.get('selectFile'));
  


  console.log("afer for loop");
  let params = new HttpParams();

  const options = {
    //params: params,
    reportProgress: true,
  };

  var apiurl=environment.FileuploadUrl + "/" + environment.FileUpload;
  //var apiurl='http://127.0.0.1:8000/uploadfile';
  
  const req = new HttpRequest('POST', apiurl, formDatass);
  return this.http.request(req);
  //return(this.uploadImage(formDatass));
}


fetchfilelist(){
  var apiurl=environment.FileuploadUrl + "/" + environment.Filelist;
  //var apiurl='http://127.0.0.1:8000/uploadedfilelist';
  const req = new HttpRequest('GET', apiurl);
  return this.http.request(req);
}

deleteafile(fileitem){
  var apiurl=environment.FileuploadUrl + "/" + environment.Filedelete;
  //var apiurl='http://127.0.0.1:8000/uploadedfiledelete';
  var jsondata = fileitem;
  const req = new HttpRequest('POST', apiurl, jsondata);
  return this.http.request(req);
}

}