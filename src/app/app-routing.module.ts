import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VizComponent } from './viz/viz.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { component: LayoutComponent, path: '' },
  { component: VizComponent, path: 'viz' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
