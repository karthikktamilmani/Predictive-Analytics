import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var ctx = $("#doughchartContainer");
    var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: ['Red'],
    datasets: [{
        label: '# of Votes',
        data: [12, 100-12],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'

        ],
        //cutoutPercentage : ,
        borderWidth: 5
    }]
    }
    });

  }

}
