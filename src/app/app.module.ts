import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TestMatDialogComponent } from './test-mat-dialog/test-mat-dialog.component';
import { MatComponentsModule } from './common/mat-components.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { TabViewComponent } from './tabview/tabview.component';
import { SitesComponent } from './sites/sites.component';
import { ApplicationsComponent } from './applications/applications.component';
import { VirtualDirectoriesComponent } from './virtual-directories/virtual-directories.component';
import { TokenDialogComponent } from './token-dialog/token-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestMatDialogComponent,
    NotFoundComponent,
    HomeComponent,
    TabViewComponent,
    SitesComponent,
    ApplicationsComponent,
    VirtualDirectoriesComponent,
    TokenDialogComponent
  ],
  entryComponents: [
    TestMatDialogComponent,
    TokenDialogComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
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
