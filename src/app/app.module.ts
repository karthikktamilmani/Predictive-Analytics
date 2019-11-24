import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VizComponent } from './viz/viz.component';
import { LayoutComponent } from './layout/layout.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { PredictionComponent } from './prediction/prediction.component';


@NgModule({
  declarations: [
    AppComponent,
    VizComponent,
    LayoutComponent,
    PieChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    PredictionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
