import { Component,
  OnInit,
  AfterViewInit,
  ViewChild, ElementRef,
  Output, Input,
  EventEmitter, } from '@angular/core';
//import { Binary } from '../model/binary';
import { FileuploadService } from '../../../natservices/fileupload.service';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifyService } from '../../../natservices/notify.service';
import { NotificationComponent } from '../../../commonmodule/notificationmodule/notification/notification.component'


@Component({
  selector: 'app-bseregupload',
  templateUrl: './bseregupload.component.html',
  styleUrls: ['./bseregupload.component.scss']
})
export class BsereguploadComponent implements OnInit {
  //upfiles=['aof','chq'];
  /*
  constructor() { }

  ngOnInit() {
  }
*/

  
  upfilescpy:string[]=["AOFandCancelledCheque"];
  upfiles:string[];
  fileName:string= "Select a File";
  filelist: FileList;
  file:File;
  showprogressbar:boolean=false;
  percentDone:number;
  filevalerror=true;
  filvaldiationmsg: string = ""; 
  selectedupfile:string;
  tableData:any;


  //tableData = [{'fileName':"Natrayan",'fullPath':"https://mybucket.s3.amazonaws.com/myfolder/afile.jpg"},{'fileName':"Kumar",'fullPath':"https://mybucket.s3.amazonaws.com/myfolder/afile.jpg"}]

  constructor(private ups:FileuploadService, 
              private notify: NotifyService, 
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.upfiles=this.upfilescpy.slice();
    this.uplodfiledatafetch();

  }

onFileInput(event){
    this.filelist=event.target.files;
    this.file= this.filelist[0];
     this.fileName= this.file.name;
     this.selectFile(event);
   }

   selectFile(event) {
    console.log(this.filevalerror);
   //this.uploadFile(event.target.files);
   console.log("insdie selectfile");
   console.log(event.target.files);
   this.filelist=event.target.files;

    if (this.filelist.length == 0) {
     this.filevalerror=true;
     this.filvaldiationmsg="No file selected!";
     console.log("No file selected!");
     }else{
       this.file=this.filelist.item(0);
       //this.file=this.filelist[0];
         if(this.file.type != 'application/tiff'){
           this.filevalerror=true;
           this.filvaldiationmsg="Only TIFF files are allowed";
             console.log("Only TIFF files are allowed");
         }else if(this.file.size > 1000000){
             this.filevalerror=true;
             this.filvaldiationmsg="File size more than 1 MB not allowed";
               console.log("File size more than 1 MB not allowed")
         }else{
           this.filevalerror=false;
         }
     }
    
     this.filelist=null;
    

    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
    console.log('---------');
    console.log(this.filevalerror);
    console.log(this.filvaldiationmsg)
    console.log('---------');


    
 }
      
  

 uploadFile() {  
   //this.uploadImage();
  this.showprogressbar=true;

  console.log(this.file);
  console.log(this.selectedupfile);
  this.ups.uploadFile(this.file,this.selectedupfile)
    .subscribe(
      event => {
        console.log("print event");
        console.log(event);
        console.log(event['body'])  
        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${this.percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
          this.showprogressbar=false;
          this.tableData=event['body'];
          console.log("this.tableData");
          console.log(this.tableData);
          this.updatedropdown();
          this.notify.update("File Upload successful","success","alert");
        }
        //this.uplodfiledatafetch();
              
        //this.notify.update(event['body']['statusdetails'],"success","alert");

      },
      (error) => {
        console.log("Upload Error:", error);
        console.log(error['message']);
        this.notify.update(error['message'],"error","alert");
      }, () => {
        console.log("Upload done");
      }
    )
    
}

uplodfiledatafetch(){
  this.showprogressbar=true;
  this.ups.fetchfilelist()
  .subscribe(
    data => {     
      console.log('--------------------');
      console.log(data);
      console.log('--------------------');
        this.tableData=data;
        console.log("this.upfiles before");
        console.log(this.upfiles);

        this.updatedropdown();
        /*
        this.tableData.forEach(element => {
          console.log(element['filetype']);          
          if(element['filecat'] == 'E'){
            var indexofstr = this.upfiles.indexOf(element['filetype']);
            console.log('indexofstr value: ',indexofstr);
            if(indexofstr != -1){
              this.upfiles.splice(indexofstr,1);
            }
          }
        });*/
        
      

      this.showprogressbar=false;
      if (data['body'] == null){
        
      }else{
        this.showprogressbar=false;        
        this.notify.update(data['body']['statusdetails'],"success","alert");
        console.log(this.tableData);      
      }
    },
    error =>{
      this.showprogressbar=false;
      console.log(error);
      console.log(error['message']);
      this.notify.update(error['body']['statusdetails'],"error","alert");
    },
    ()=> {}
  );
}

deletefile(fileitem){  
  this.showprogressbar=true;  

  console.log("inside fileite");
  console.log(fileitem);

  this.ups.deleteafile(fileitem).subscribe(
    data => {
      console.log('-------------------');
      console.log("inside data");
      console.log(data);
      console.log('-------------------');
      this.showprogressbar=false;  
      this.upfiles=this.upfilescpy.slice();
      this.notify.update("File delete successful","success","alert");
      this.tableData=data;
      this.updatedropdown();
      //this.uplodfiledatafetch();
    },
    error =>{
      this.showprogressbar=false;
      console.log(error['message']);
      this.notify.update(error['message'],"error","alert");
    },
    ()=> {}
  );
}


submitregistobse(){
  this.showprogressbar=true;
  this.ups.finalsubmit().subscribe(
    data => {
      this.showprogressbar=false;  
      console.log('inside data of submit succcess');
      this.notify.update(data['statusdetails'],"success","alert");
      this.router.navigateByUrl('/securedpg/dashboard');

    },
    error =>{
      this.showprogressbar=false;
      console.log(error['message']);
      this.notify.update(error['message'],"error","alert");
    },
    ()=> {
      this.showprogressbar=false;
    }
  );
}

updatedropdown(){
this.tableData.forEach(element => {
  console.log(element['filetype']);          
  if(element['filecat'] == 'E'){
   
    var indexofstr = this.upfiles.indexOf(element['filetype']);
    if(indexofstr != -1){
      this.upfiles.splice(indexofstr,1);
    }
  }
});
}

}