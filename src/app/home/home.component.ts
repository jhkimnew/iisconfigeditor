import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material';
import { TokenDialogComponent } from '../token-dialog/token-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private tokenKey = '';

  get tokenInitialized() {
    return this.tokenKey !== '';
  }
  constructor(private dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
    setTimeout(() => this.openDialog(), 0);
  }

  openDialog() {
    this.dialog.open(TokenDialogComponent, {
      data: { id: 1}
    })
    .afterClosed()
    .subscribe(result => {
      this.tokenKey = result;
      console.log(result);
    });
  }
}
