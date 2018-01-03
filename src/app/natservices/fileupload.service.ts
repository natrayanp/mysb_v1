import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class FileuploadService {

  constructor(private http: HttpClient) { }

  // file from event.target.files[0]
  uploadFile(url: string, file: File): Observable<HttpEvent<any>> {
    console.log("inside service"+file);
    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      //params: params,
      reportProgress: true,
    };
    url='http://127.0.0.1:8000/uploadfile';
    
    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }
}