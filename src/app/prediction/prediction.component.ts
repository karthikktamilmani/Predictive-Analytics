import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

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
