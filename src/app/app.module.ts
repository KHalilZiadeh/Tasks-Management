import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './home/home.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { AuthGuard } from './shared/services/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HomeModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    MatDialogModule,
    MatButtonModule,
    MatCommonModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
