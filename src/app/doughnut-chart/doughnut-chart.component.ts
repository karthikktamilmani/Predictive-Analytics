import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() apiResponse:any;
  constructor() { }

  ngOnInit() {

    var ctx = $("#doughchartContainer");
    var myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Average', 'Total'],
        datasets: [{
          label: '# of Votes',
          data: [12, 100 - 12],
          backgroundColor: [
            '#ffc107'
          ],
          //cutoutPercentage : ,
          borderWidth: 5
        }]
      }
    });

  }

}
