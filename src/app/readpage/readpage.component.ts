import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService, name } from '../http.service';
export interface patient{
  gender:string;
  birthDate:string;
  name:Array<name>;
}



@Component({
  selector: 'app-readpage',
  templateUrl: './readpage.component.html',
  styleUrls: ['./readpage.component.css']
})

export class ReadpageComponent implements OnInit {
  
  pat: Array<patient>;
  id = "";
  PatientForm : FormGroup;

  constructor(private httpService: HttpService,  private fb: FormBuilder) {
    this.pat = [{gender:"", birthDate:"", name:[{ family:'', given:['']}]}];
    this.PatientForm = fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['',Validators.required],
      birthDate: ['', Validators.required]
    });

   }

  ngOnInit(): void {
  }

  async ReadRequest(){
    
    this.pat = await this.httpService.getAllPatients();

  }

  async onSubmit(){
    await this.httpService.createPatient(this.PatientForm.get("name")?.value,
    this.PatientForm.get("surname")?.value, 
    this.PatientForm.get("gender")?.value, 
    this.PatientForm.get("birthDate")?.value);
  }

  async ReadByIdRequest(){
    
    this.pat[0] = await this.httpService.getPatientById(this.id);

  }

  async deletePatient(){
    await this.httpService.deletePatient(this.id);
  }

  async updatePatient(){
    await this.httpService.updatePatient(this.id, this.PatientForm.get("name")?.value,
    this.PatientForm.get("surname")?.value, 
    this.PatientForm.get("gender")?.value, 
    this.PatientForm.get("birthDate")?.value);
  }
}
