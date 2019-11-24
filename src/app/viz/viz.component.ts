import { Component, OnInit } from '@angular/core';
declare let L;
import '../../assets/BoundaryCanvas.js';
import * as $ from 'jquery';


@Component({
  selector: 'app-viz',
  templateUrl: './viz.component.html',
  styleUrls: ['./viz.component.scss']
})
export class VizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
var jsonData = {"across_canada_data": [{"lat": 41.0, "lon": -142.0, "value": 5.08}, {"lat": 41.0, "lon": -141.5, "value": 5.0},
 {"lat": 41.0, "lon": -141.0, "value": 4.92}, {"lat": 41.0, "lon": -140.5, "value": 4.84}, {"lat": 41.0, "lon": -140.0, "value": 4.76}]};
    const map = L.map('map');
    $.getJSON('https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/CAN.geo.json').then(function(geoJSON) {
  //https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/CAN.geo.json / https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png / /maps.wikimedia.org/osm-intl/
      var layer =  new L.TileLayer.BoundaryCanvas('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
            boundary: geoJSON,
            attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        map.addLayer(layer);
        var ukLayer = L.geoJSON(geoJSON);
        //map.fitBounds(ukLayer.getBounds());
        map.setView([57.634,-101.887],5);
      });


  $.each(jsonData["across_canada_data"], function(index, jsonObj){

    var latitude = jsonObj["lat"];
    var longitude = jsonObj["lon"]
    var value = jsonObj["value"]
  var dummyCircle = L.circle([latitude, longitude], {
			color: "green",
			fillColor: "#36BF1D",
			fillOpacity: 0.6,
			radius: value * 2000
		}).addTo(map);
  });
}

}
