import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  apiResponse:any;
  isLoading=false;
  constructor(private store: StoreService) { }

  ngOnInit() {

    var queryType="PEOPLE_TO";
    var selectedCity = "calgary";
    this.isLoading=true;
    this.store.get('/map?query='+queryType+'&city='+selectedCity+'&month=1', {}).subscribe((res) => {
        //
        this.apiResponse=res;
        this.isLoading=false;
        //
      });

  }

  collapse() {
    if (document.getElementById("wrapper").classList.contains("collapse")) {
      $('.wrapper').removeClass('collapse');
    } else {
      $('.wrapper').addClass('collapse');
    }
  }
}
