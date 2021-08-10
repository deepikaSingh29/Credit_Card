import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import { jsPDF } from 'jspdf';
 
import html2canvas from 'html2canvas';
import {FormGroup,FormControl,Validators,FormArray} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environment';
import { ApiService } from '../app/app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  creditForm:FormGroup;
  isSubmitted:boolean;


  Month: any = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  constructor( private api:ApiService,private fb:FormBuilder) {
    this.creditForm=this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      cardNo: ['', Validators.compose([Validators.required])],
      cvv: ['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(3)])],
      expiryMonth: ['', Validators.compose([Validators.required])],
      expiryYear: ['', Validators.compose([Validators.required])],
    })
   }

  ngOnInit(): void {
  }

     get f() { return this.creditForm.controls; }

  changeMonth(e:any) {
    console.log(e.value)
    this.creditForm.controls.expiryMonth.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit(){
    console.log(this.creditForm);
    this.isSubmitted = true;
    if (!this.creditForm.valid) {
      return false;
  }else{
    console.log(this.creditForm);
    let reqObj=this.creditForm.value;
    this.api.post(environment.endpoint,reqObj).then(resp=>{alert(JSON.stringify(resp))},err=>{alert(JSON.stringify(err))});
  }
   
 
  }

}
