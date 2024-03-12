import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyzeComponent } from './analyze.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { AnalyzeTableComponent } from './components/analyze-table/analyze-table.component';



const routes: Routes = [{path:'', component:AnalyzeComponent}]

@NgModule({
    declarations: [AnalyzeComponent, AnalyzeTableComponent],
    imports: [
        CommonModule, RouterModule.forChild(routes),
        SharedModule
    ]
})
export class AnalyzeModule { }
