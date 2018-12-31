import { OnInit } from '@angular/core';
import { IISAdministrationApiService } from './unittest-iisadministration.service';

export class IISAdministrationComponent implements OnInit {
  result: any[] = [];
  message: any;

  constructor(private service: IISAdministrationApiService) {}

  ngOnInit() {}

  createToken() {
    this.service.createToken().subscribe(
      (t: any) => this.result.push(t),
      (err: any) => this.message = err);
  }
}
