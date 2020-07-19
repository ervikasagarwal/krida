import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
    // path: '',
    // component: KridaTvHeaderComponent,
    // children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./ktv-home/ktv-home.module').then(m => m.ktvHomeModule)
      },
    // ],
  // },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
