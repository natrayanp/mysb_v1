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

  
  upfilescpy:string[]=["AOF","CancelledCheque"];
  upfiles:string[];
  fileName:string= "Select a File";
  filelist: FileList;
  file:File;
  showprogressbar:boolean=false;
  percentDone:number;
  filevalerror=true;
  filvaldiationmsg: string = ""; 
  selectedupfile:string;
  listfetchprogbar=true;
  tableData:any;


  //tableData = [{'fileName':"Natrayan",'fullPath':"https://mybucket.s3.amazonaws.com/myfolder/afile.jpg"},{'fileName':"Kumar",'fullPath':"https://mybucket.s3.amazonaws.com/myfolder/afile.jpg"}]

  constructor(private ups:FileuploadService, private http: HttpClient) { }

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

        }
        this.uplodfiledatafetch();
        

      },
      (err) => {
        console.log("Upload Error:", err);
      }, () => {
        console.log("Upload done");
      }
    )
    
}

uplodfiledatafetch(){
  this.listfetchprogbar=true;
  this.ups.fetchfilelist()
  .subscribe(
    data => {     
      console.log(data['body'])
      if (data['body'] == null){
        console.log("empty body");
        this.tableData=[];
      }else{
        this.tableData=data['body'];
        console.log("this.upfiles before");
        console.log(this.upfiles);
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

      this.listfetchprogbar=false;
      
      console.log(this.tableData);      
    },
    error =>{
      this.listfetchprogbar=false;
    },
    ()=> {}
  );
}

deletefile(fileitem){
  
  this.ups.deleteafile(fileitem).subscribe(
    data => {  
      this.upfiles=this.upfilescpy.slice();

      this.uplodfiledatafetch();
    }
  );
}


}