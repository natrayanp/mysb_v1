import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postlogintoolbar',
  templateUrl: './postlogintoolbar.component.html',
  styleUrls: ['./postlogintoolbar.component.scss']
})
export class PostlogintoolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logoutact()
{
  localStorage.removeItem("natjwt");  
}

}
