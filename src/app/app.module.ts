import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';



import { TestMatDialogComponent } from './test-mat-dialog/test-mat-dialog.component';
import { MatComponentsModule } from './mat-components.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestMatDialogComponent
  ],
  entryComponents: [
    TestMatDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppComponent
        }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
