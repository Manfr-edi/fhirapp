import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }



  getPatient() {
    
    

    
    this.http.post<any>("https://localhost:8243/resources/1.0.0/read", {'resourceType': 'Patient'},
    {headers: {"Content-Type": 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuUjBKUXZsZF93VWZzQ0hxbGxLenNTMHlOeEdtWlVUQnVYYXk3NDhQdlJjIn0.eyJleHAiOjE2NDM4MjA2MDAsImlhdCI6MTY0MzgyMDU0MCwianRpIjoiNTAxYWE4YjktYzM5OS00YjA2LWE4MjItMDkyNGM5NWM1ZmYyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3Y2U1NzcyNy00MmJhLTM4NGItYjJkZi0yZmZhNGVlMWZjZjMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiIzYjBiMzc3Ni1iYzY1LTRiOGMtYTU2ZS04YjM2NWE0N2I4N2EiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3QiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImNsaWVudEhvc3QiOiIxMjcuMC4wLjEiLCJjbGllbnRJZCI6IjNiMGIzNzc2LWJjNjUtNGI4Yy1hNTZlLThiMzY1YTQ3Yjg3YSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTNiMGIzNzc2LWJjNjUtNGI4Yy1hNTZlLThiMzY1YTQ3Yjg3YSIsImNsaWVudEFkZHJlc3MiOiIxMjcuMC4wLjEifQ.bqTcYdh0l8cX1rfrKE_n3T0w4-E5klAoWxiZ8qHfn-8hpF8nt0OrGjJy7HBYoy7QbY8SeuGj_pxZqn6nhCem9DrEbK3zbVvjDvSiIlqlPh83M0id88oLjRhKrNvHKcC56-EAyEW91At2mhZFjf4V84AE7Z_qsjak0upE2NvPw7eODQtosdk1rWfsI3CbE_kA4c_Hs1p26mViGYLhdkMsDdKiMzC2Ud_h87c-eTaCUWepf5xbXQ6AG8TktS5WO4KMdizct3LZebjRnp-SD6LcNre918IoZ5nb96jpdWZLlj5tLVlO6kybxFCwPKpoPh016x1_XsN_KI2TihaUIgZv9w',
    "Access-Control-Allow-Origin": '*'}}).subscribe(r => console.log(r));
  }
}




