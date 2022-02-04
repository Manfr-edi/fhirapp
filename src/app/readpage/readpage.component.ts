import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-readpage',
  templateUrl: './readpage.component.html',
  styleUrls: ['./readpage.component.css']
})
export class ReadpageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  ReadRequest(){
    this.httpService.getPatient();

  }
}
