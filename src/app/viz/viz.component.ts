import { Component, OnInit, Input } from '@angular/core';
declare let L;
import '../../assets/BoundaryCanvas.js';
import * as $ from 'jquery';
import Chart from 'chart.js';
import { StoreService } from '../store.service';


@Component({
  selector: 'app-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.scss']
})
export class VizComponent implements OnInit {

  apiPieResponse: any;
  @Input() apiMapResponse: any;
  isLocationSelected = false;
  isResponseLoaded = false;
  apiDoughResponse: any;
  highestValue:string;
  lowestValue:string;
  apiLineResponse:any;
  constructor(private store: StoreService) {

  }

  ngOnInit() {

    //
    this.apiPieResponse = [];
    //
    console.log("haai");

    const map = L.map('myMap');
    $.getJSON('https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/CAN.geo.json').then(function(geoJSON) {
      //https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/CAN.geo.json / https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png / /maps.wikimedia.org/osm-intl/
      var layer = new L.TileLayer.BoundaryCanvas('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        boundary: geoJSON,
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      map.addLayer(layer);
      //var canadaLayer = L.geoJSON(geoJSON);
      //map.fitBounds(ukLayer.getBounds());
      map.setView([57.634, -101.887], 3.5);
    });
    //
    var sourceColor = "red", sourceFillColor = "#dc3545";
    var queryType= $("#queryType").val();
    var selectedCity = $("#citySelected").val();

    console.log(this.apiMapResponse);
    var sourceLat = this.apiMapResponse["source_latlng"]["latitude"];
    var sourceLong = this.apiMapResponse["source_latlng"]["longitude"];
    L.circle([sourceLat, sourceLong], {
      color: sourceColor,
      fillColor: sourceFillColor,
      fillOpacity: 0.6,
      radius: 20000
    }).addTo(map);
    //
      //
      $.each(this.apiMapResponse["data"], (index,row) => {
        //
        //'Business Class', 'Economy', 'First Class', 'Premium Economy'
        var newRowObj = [];
          newRowObj.push(row["Business Class"]);
          newRowObj.push(row["Economy"]);
          newRowObj.push(row["First Class"]);
          newRowObj.push(row["Premium Economy"]);
        var newLineObj = [];
        var extraParaObj = this.apiMapResponse["extra"][row["city"]];
        var labelObj = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        $.each(labelObj,(index,rowValue)=>{
          if( extraParaObj )
          {
            newLineObj.push(extraParaObj[rowValue]);
          }
        });
        var lineResObj = {
          labels : labelObj,
          data : newLineObj
        }
        //
        var plotValue = row["total_expense"], plotLabel = "Cost", plotQuantifier = 10;
        if( queryType == "PEOPLE_FROM" || queryType == "PEOPLE_TO" || queryType == "TOTAL_PASSENGER_TO" || queryType == "TOTAL_PASSENGER_FROM" )
        {
          plotValue = row["passenger_count"];
          plotLabel = "People to";
          plotQuantifier = 800;
          if( queryType == "PEOPLE_FROM" || queryType == "TOTAL_PASSENGER_FROM" )
          {
            plotLabel = "People from";
          }
        }
        //
        var destLat = row["latlng"]["latitude"];
        var destLon = row["latlng"]["longitude"];
        //
        var circle = L.circle([destLat, destLon], {
          color: "blue",
          fillColor: "#007AFF",
          fillOpacity: 0.6,
          weight: 1,
          radius: plotValue * 2000
        }).addTo(map);

        circle.bindPopup("Total "+plotLabel+" " + row["city"] + ": " + plotValue);

        circle.on('mouseover', function (e) {
            this.openPopup();
        });
        circle.on('mouseout', function (e) {
            this.closePopup();
        });
        circle.on('click',  (e) => {
            console.log(plotLabel);
            this.apiPieResponse=[];
            this.apiLineResponse=[];
            this.isLocationSelected=false;
            setTimeout(()=>{
            this.apiPieResponse = newRowObj;
            this.apiLineResponse = lineResObj;
            this.isLocationSelected=true;
          },300);
        });

        //
      });
      //
      this.apiDoughResponse = [12 , 100 -12];
      //data for dough Chart
      this.isResponseLoaded=true;
      //
var doughColor = '#ffc107';
        //
        var dataObj = this.apiMapResponse["extra"][$("#citySelected option:selected").text()];
        //
        if( dataObj )
        {
          var eachPert = dataObj["max"] - dataObj["min"];
          eachPert = eachPert/100;
          this.highestValue = dataObj["max"];
          this.lowestValue = dataObj["min"];
          //
          var currentMonthPer = dataObj[$("#month option:selected").text()];
          //
          if( ((currentMonthPer - dataObj["min"]) / eachPert ) < 25 )
          {
            doughColor = "#28a745";
          }
          else if ( ((currentMonthPer - dataObj["min"]) / eachPert ) > 70 )
          {
            doughColor = "#dc3545";
          }
          //currentMonthPer=currentMonthPer/eachPert;
          this.apiDoughResponse[0]=currentMonthPer;
          this.apiDoughResponse[1]=dataObj["max"]-currentMonthPer;
        }
        //


    //
    var ctx = $("#doughchartContainer");
    var myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Average', 'Total'],
        datasets: [{
          label: '# of Votes',
          data:  this.apiDoughResponse,
          backgroundColor: [
            doughColor
          ],
          //cutoutPercentage : ,
          borderWidth: 5
        }]
      }
    });
    //
    console.log("hai");
    console.log(this.apiPieResponse);
    console.log("hhhh");
  }


}
