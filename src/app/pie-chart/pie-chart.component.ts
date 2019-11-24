import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import * as $ from 'jquery';
import { StoreService } from '../store.service';
//import CanvasJS from 'canvasjs';
//var CanvasJS = require('canvasjs');

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() pieResponse = [];

  constructor(private store: StoreService) { }

  ngOnInit() {

    window.scrollBy(0, 500); // Scroll 100px to the right

    /*
        var queryType="PEOPLE_TO";
        this.store.get('/map?query='+queryType+'&city=calgary&month=1', {}).subscribe((res) => {
          //


          //
        });
    */

    console.log("eeeeeeee");
    console.log(this.pieResponse);
    //

    //
    var ctx = $("#piechartContainer");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Business Class', 'Economy', 'First Class', 'Premium Economy'],
        datasets: [{
          label: 'Cost',
          data: this.pieResponse,
          backgroundColor: [
            'rgba(54, 162, 235, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            '#dc3545',
            'rgba(255, 206, 86, 0.9)'
          ],

          borderWidth: 5
        }]
      }
    });

    /*
    data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)'
              ],

              borderWidth: 5
            }]
          }
        });

        /*
        data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        */
  }

}
