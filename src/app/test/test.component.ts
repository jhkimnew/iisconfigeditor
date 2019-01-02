import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { TestMatDialogComponent } from '../test-mat-dialog/test-mat-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  colors = [
    { id: 1, name: 'Red'},
    { id: 2, name: 'Green'},
    { id: 3, name: 'Blue'}
  ];

  isChecked = true;
  color = 2;
  minDate = new Date(2017, 1, 1);
  maxDate = new Date(2020, 12, 12);

  multiSelectCategories = [
    { name: 'Beginner' },
    { name: 'Intermediate' },
    { name: 'Advanced' }
  ];

  categories = [
    { name: 'Beginner' },
    { name: 'Intermediate' },
    { name: 'Advanced' }
  ];

  progress = 0;
  timer;

  courses;

  isLoading = false;

  panelOpenState = false;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress++;
      if (this.progress === 100) { clearInterval(this.timer); }
    }, 20);

    this.isLoading = true;
    this.getFakeCourses()
    .subscribe(_ => this.isLoading = false);
  }

  getFakeCourses() {
    return timer(2000);
  }

  onChange(event) {
  console.log(event);
  }

  selectCategory(category) {
    this.categories
      .filter(c => c !== category)
      .forEach(c => c['selected'] = false);

    category.selected = !category.selected;
  }

  openDialog() {
    this.dialog.open(TestMatDialogComponent, {
      data: { id: 1}
    })
      .afterClosed()
      .subscribe(result => console.log(result));
  }
}
