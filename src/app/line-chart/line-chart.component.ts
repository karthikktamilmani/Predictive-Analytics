import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    var ctx = $("#linechartContainer");
    var myPieChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],

        borderColor: [
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
        clip: {left: 5, top: false, right: -2, bottom: 0}
    }]
  },
  options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
  });

  }

}
