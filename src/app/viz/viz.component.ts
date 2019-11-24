import { Component, OnInit, Input } from '@angular/core';
declare let L;
import '../../assets/BoundaryCanvas.js';
import * as $ from 'jquery';
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
    // L.circle([sourceLat, sourceLong], {
    //   color: sourceColor,
    //   fillColor: sourceFillColor,
    //   fillOpacity: 0.6,
    //   radius: 20000
    // }).addTo(map);
    //

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
            this.isLocationSelected=false;
            setTimeout(()=>{
            this.apiPieResponse = newRowObj;
            this.isLocationSelected=true;
          },300);
        });

        //
      });

    //
    console.log("hai");
    console.log(this.apiPieResponse);
    console.log("hhhh");
  }


}
