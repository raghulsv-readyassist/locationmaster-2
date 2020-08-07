import { Component, OnInit, Input } from '@angular/core';
import { MapService } from 'src/app/shared/map.service';
import { NgForm } from '@angular/forms';
import { Map } from 'src/app/shared/map.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  public polycoords: Array<any>=[];
  
    
  // @Input() childMessage: string;

  constructor(public service:MapService) { }

  ngOnInit(): void {
    this.service.polycoords.subscribe(res => this.polycoords = res)
    console.log(this.polycoords);
    this.resetFrom();
    
    
    
  }
  onsubmit(form:NgForm){
    
    this.insertrecord(form);
    
   
    // this.service.formdata.patchValue(this.message);
  }
  insertrecord(form: NgForm){
    this.service.postmap(form.value).subscribe(res => {
      
    });

  }
  resetFrom(form?:NgForm){
    if (form!=null)
    form.resetForm();
    this.service.formdata ={
      name:'',
      shortcode:'',
      coords:''
    }
  }

}