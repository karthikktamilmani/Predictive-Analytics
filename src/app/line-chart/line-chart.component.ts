import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() lineResponse:any;

  constructor() { }

  ngOnInit() {

    if( this.lineResponse == null )
    {
      this.lineResponse = {
        labels : ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        data : [12, 19, 3, 5, 2, 3]
      };
    }
    //
    var labelSel = this.lineResponse["labels"];
    var dataSel = this.lineResponse["data"]
    var ctx = $("#linechartContainer");
    var myPieChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labelSel,
        datasets: [{
          label: '',
          data: dataSel,

          borderColor: [
            '#dc3545'
          ],
          backgroundColor: [
            'rgba(255,255,255, 0.1)'
          ],
          borderWidth: 3,
          clip: { left: 5, top: false, right: -2, bottom: 0 }
        }]
      },
      options: {
        legend: { display: false }
      }
    });

  }

}
