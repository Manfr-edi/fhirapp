import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


export interface token {
  access_token: string;
  token_type: string
};

export interface patient {
  birthdate: string;
  gender: string;
  name: Array<string>;
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {



  constructor(private http: HttpClient) { }




  async getToken(): Promise<String> {

    let t: token;
    let body = new HttpParams();
    body.set('grant_type', "client_credential");


    let ob = this.http.post<token>(" http://localhost:8080/auth/realms/master/protocol/openid-connect/token", "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
          "Authorization": 'Basic M2IwYjM3NzYtYmM2NS00YjhjLWE1NmUtOGIzNjVhNDdiODdhOmYzRTBlZXhPNU9tdm5ZWU54elI4N2ZKVkc3RzIzWUhi',
        }
      });

    t = await lastValueFrom(ob);
    return t.access_token;




  }

  async getPatient() {



    let t = await this.getToken();

    console.log(t)
    let ob = this.http.post<Array<patient>>("https://localhost:8243/resources/1.0.0/read", {'resourceType': 'Patient'},
    {headers: {"Content-Type": 'application/json', 
    'Authorization': 'Bearer '+ t,
    "Access-Control-Allow-Origin": '*'}});

    let pats = await lastValueFrom(ob);
    console.log(pats[0].name);
  }}




