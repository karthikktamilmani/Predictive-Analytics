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

    const map = L.map('map');
    $.getJSON('https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/CAN.geo.json').then(function(geoJSON) {
  //https://cdn.rawgit.com/johan/world.geo.json/34c96bba/countries/CAN.geo.json
      var layer =  new L.TileLayer.BoundaryCanvas('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            boundary: geoJSON,
            attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        map.addLayer(layer);
        var ukLayer = L.geoJSON(geoJSON);
        map.fitBounds(ukLayer.getBounds());

      });
  }

}
