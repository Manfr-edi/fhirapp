import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface token {
  access_token: string;
};
export interface patient {
  gender: string;
  birthDate: string;
  name: Array<name>;
 }
export interface name{
  family:string;
  given:Array<string>;
}

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  
  t : token;
  constructor(private http: HttpClient) { 
    this.t = {access_token:""};
  }

  async getToken() {
    
    let obs = this.http.post<token>("http://localhost:8080/auth/realms/master/protocol/openid-connect/token", "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
          "Authorization": 'Basic MTc2YTlhYWItM2RmYS00OTY0LTkwZTctYzYwMDk2ZDMzZGUxOnc5dTdYRGlnV1JSdmVaSG1PVFVTZ0RpdlZZQTBLYnFq' 
          //client angular appYW5ndWxhci1hcHA6WWZuVXh2cGNKN1lYeUQ5RGhFY3ZHRExEM3ZJdmxxcGo= MTc2YTlhYWItM2RmYS00OTY0LTkwZTctYzYwMDk2ZDMzZGUxOnc5dTdYRGlnV1JSdmVaSG1PVFVTZ0RpdlZZQTBLYnFq
        }
      });
    this.t = await lastValueFrom(obs);
    console.log(this.t.access_token);
    return this.t.access_token;

  } 

  async getAllPatients() : Promise<patient[]> {

    if(this.t.access_token==""){
      this.t.access_token = await this.getToken();
    }
    
    let data = this.http.post<Array<patient>>("https://localhost:8243/resources/1.0.0/read", { 'resourceType': 'Patient' },
      {
        headers: {
          "Content-Type": 'application/json',
          'Authorization': "Bearer " + this.t.access_token,
          "Access-Control-Allow-Origin": '*'
        }
      });
     
    let pat = await lastValueFrom(data);
    console.log(pat[0]);
    
    return pat;

  }

  async getPatientById(id : string) : Promise<patient> {
    
    if(this.t.access_token==""){
      this.t.access_token = await this.getToken();
      console.log(this.t.access_token)
    }
    
    let data = this.http.post<patient>("https://localhost:8243/resources/1.0.0/readSpecificResourceById", { 'resourceType': 'Patient', 'id': id },
      {
        headers: {
          "Content-Type": 'application/json',
          'Authorization': "Bearer " + this.t.access_token,
          "Access-Control-Allow-Origin": '*'
        }
      });
     
    let pat = await lastValueFrom(data);
    return pat;
  }

  async createPatient(name : string, surname : string, gender : string, birthDate : string) {
    
    if(this.t.access_token==""){
      this.t.access_token = await this.getToken();
      console.log(this.t.access_token)
    }
    
    let id = name + surname;
    this.http.put<patient>("https://localhost:8243/resources/1.0.0/createSimplified", 
    { 'resourceType': 'Patient', 
      'id': id, 
      'surname' : surname,
      'name' : name,
      'gender' : gender,
      'birthDate' : birthDate },
      {
        headers: {
          "Content-Type": 'application/json',
          'Authorization': "Bearer " + this.t.access_token,
          "Access-Control-Allow-Origin": '*'
        }
      });
  }


  async deletePatient(id : string) {
    
    if(this.t.access_token==""){
      this.t.access_token = await this.getToken();
      console.log(this.t.access_token)
    }
    
    this.http.post<patient>("https://localhost:8243/resources/1.0.0/delete",
     { 'resourceType': 'Patient', "idToDelete": id },
      {
        headers: {
          "Content-Type": 'application/json',
          'Authorization': "Bearer " + this.t.access_token,
          "Access-Control-Allow-Origin": '*'
        }
      }).subscribe(r=> console.log(r));;
  
  }

  async updatePatient(id : string, name : string, surname : string, gender : string, birthDate : string) {
    
    if(this.t.access_token==""){
      this.t.access_token = await this.getToken();
      console.log(this.t.access_token)
    }
    console.log(gender);
    this.http.put<patient>("https://localhost:8243/resources/1.0.0/updateSimplified", 
    { 'resourceType': 'Patient', 
      'idToUpdate': id, 
      'surname' : surname,
      'name' : name,
      'gender' : gender,
      'birthDate' : birthDate },
      {
        headers: {
          "Content-Type": 'application/json',
          'Authorization': "Bearer " + this.t.access_token,
          "Access-Control-Allow-Origin": '*'
        }
      }).subscribe(r=> console.log(r));
  }
}




