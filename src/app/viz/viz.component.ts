import { Component, OnInit } from '@angular/core';
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

  apiPieResponse:any;
  isLoading=false;
  constructor(private store: StoreService) {

  }

  ngOnInit() {

    //
    this.apiPieResponse = [];
    //

    $("#myMap").html("");
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
      map.setView([57.634, -101.887], 5);
    });
    //
    var sourceColor = "red", sourceFillColor = "#dc3545";
    var queryType="PEOPLE_TO";
    var selectedCity = "calgary";
    this.isLoading=true;
    this.store.get('/map?query='+queryType+'&city='+selectedCity+'&month=1', {}).subscribe((res) => {
      this.isLoading=false;
      console.log(res);
      var sourceLat = res["source_latlng"]["latitude"];
      var sourceLong = res["source_latlng"]["longitude"];
      L.circle([sourceLat, sourceLong], {
        color: sourceColor,
        fillColor: sourceFillColor,
        fillOpacity: 0.6,
        radius: 20000
      }).addTo(map);
      //

      //
      $.each(res["data"], (index,row) => {
        //
        //'Business Class', 'Economy', 'First Class', 'Premium Economy'
        if( row["city"].toLowerCase() == selectedCity)
        {
          this.apiPieResponse.push(row["Business Class"]);
          this.apiPieResponse.push(row["Economy"]);
          this.apiPieResponse.push(row["First Class"]);
          this.apiPieResponse.push(row["Premium Economy"]);
        }
        //
        var plotValue = row["total_expense"], plotLabel = "Cost";
        if( queryType == "PEOPLE_FROM" || queryType == "PEOPLE_TO" || queryType == "TOTAL_PASSENGER_TO" || queryType == "TOTAL_PASSENGER_FROM" )
        {
          plotValue = row["passenger_count"];
          plotLabel = "People to";
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
          color: "green",
          fillColor: "#36BF1D",
          fillOpacity: 0.6,
          radius: plotValue * 2000
        }).addTo(map);

        circle.bindPopup("Total "+plotLabel+" " + row["city"] + ": " + plotValue);

        circle.on('mouseover', function (e) {
            this.openPopup();
        });
        circle.on('mouseout', function (e) {
            this.closePopup();
        });

        //
      });
      //
      console.log("hai");
      console.log(this.apiPieResponse);
      console.log("hhhh");

    });


  }


}
