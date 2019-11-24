import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  collapse() {
    if (document.getElementById("wrapper").classList.contains("collapse")) {
      $('.wrapper').removeClass('collapse');
    } else {
      $('.wrapper').addClass('collapse');
    }
  }
}
