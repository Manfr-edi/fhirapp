import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-readpage',
  templateUrl: './readpage.component.html',
  styleUrls: ['./readpage.component.css']
})
export class ReadpageComponent implements OnInit {
 id=""
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  async ReadRequest(){
    await this.httpService.getPatient();

  }
}
