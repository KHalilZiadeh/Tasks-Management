import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () =>
      import('./auth/auth.module').then((auth) => auth.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((home) => home.HomeModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then((tasks) => tasks.TasksModule),
  },
  {
    path: 'analyze',
    loadChildren: () =>
      import('./analyze/analyze.module').then((analyze) => analyze.AnalyzeModule),
  },
  { path: '**', redirectTo: 'landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
