import { Injectable } from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  template: `
    
      <ul *ngIf="courses  as courses else noData">
          <div *ngFor="let course of courses">
            <!--div *ngFor="let course1 of course"-->            
            {{course.pfportfolioname}}
              <br>
              <hr>
              
            <!--/div-->
          </div> 
      </ul>
      <ng-template #noData>No Data Available</ng-template>
  `})
export class PfserviceService implements OnInit {

  //courses : Observable<any>;


  constructor(private http:HttpClient) {
  }
  courses:any;
  ngOnInit() {

/*    this.courses = this.http
    .get("")
    .do(console.log)
    .map(data => _.values(data))   */


    this.http.get('http://127.0.0.1:8000/pfdata')
    .subscribe(data => 
      {
        console.log(data);
        this.courses =data;
      }
    );

  }
}

