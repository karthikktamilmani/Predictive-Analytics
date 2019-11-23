import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VizComponent } from './viz/viz.component';


const routes: Routes = [
  { component:VizComponent , path: 'viz'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
