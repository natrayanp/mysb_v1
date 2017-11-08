import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
    public options = {
      position: ["bottom", "right"],
      timeOut: 5000,
      lastOnBottom: false,
      showProgressBar: true,
      pauseOnHover: true,
      clickIconToClose: true,      
      maxLength: 10
  }

}
