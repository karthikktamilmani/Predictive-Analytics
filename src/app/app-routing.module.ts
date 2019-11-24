import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VizComponent } from './viz/viz.component';
import { LayoutComponent } from './layout/layout.component';
import { PredictionComponent } from './prediction/prediction.component';

const routes: Routes = [
  { component: LayoutComponent, path: '' },
  { component: PredictionComponent, path: 'prediction' },
  { component: VizComponent, path: 'viz' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
