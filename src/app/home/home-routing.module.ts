import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes : Routes = [ 
  {
    path:'', pathMatch:'full', component:HomeComponent
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('../tasks/tasks.module').then((tasks) => tasks.TasksModule),
  },
  {
    path: 'analyze',
    loadChildren: () =>
      import('../analyze/analyze.module').then((analyze) => analyze.AnalyzeModule),
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
