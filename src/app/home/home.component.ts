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
  constructor(private dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
    if (!this.data.tokenInitialized) {
      setTimeout(() => this.openLogInDialog(), 0);
    }
  }

  openLogInDialog() {
    this.dialog.open(TokenDialogComponent, {
      data: { id: 1}
    })
    .afterClosed()
    .subscribe(result => {
      this.data.token = result;
      console.log(result);
    });
  }
}
