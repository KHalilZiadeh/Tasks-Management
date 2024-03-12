import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [{path:'', component:TasksComponent}]

@NgModule({
    declarations: [TasksComponent, TasksTableComponent],
    imports: [
        CommonModule, RouterModule.forChild(routes),
        SharedModule
    ]
})
export class TasksModule { }
