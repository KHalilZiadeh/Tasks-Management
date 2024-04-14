import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent, TaskFormComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, SharedModule],
})
export class HomeModule { }
