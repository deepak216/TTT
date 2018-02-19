import { Component } from '@angular/core';
import {DataService} from './app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 private input:number;
 responseData:Array<any>;
 
 constructor(private dataService:DataService){

 }

 getDataFromService(){
  this.dataService.getdata(this.input)
    .subscribe(res=>{
      this.responseData=res;
      console.log(this.responseData);
    });
 }
}
