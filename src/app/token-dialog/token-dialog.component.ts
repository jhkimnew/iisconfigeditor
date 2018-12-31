import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.css']
})
export class TokenDialogComponent implements OnInit {
  result: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    console.log('Data', data);
  }

  ngOnInit() {
  }
}
