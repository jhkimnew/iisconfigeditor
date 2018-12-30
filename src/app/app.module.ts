import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TestMatDialogComponent } from './test-mat-dialog/test-mat-dialog.component';
import { MatComponentsModule } from './common/mat-components.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestMatDialogComponent,
    NotFoundComponent,
    HomeComponent
  ],
  entryComponents: [
    TestMatDialogComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'test',
          component: TestComponent
        },
        {
          path: '**',
          component: NotFoundComponent
        }
      ]
      )
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
