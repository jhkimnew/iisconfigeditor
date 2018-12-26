import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-test-mat-dialog',
  templateUrl: './test-mat-dialog.component.html',
  styleUrls: ['./test-mat-dialog.component.css']
})
export class TestMatDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    console.log('Data', data);
  }

  ngOnInit() {
  }

}
