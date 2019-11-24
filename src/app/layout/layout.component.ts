import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  apiResponse: any;
  isLoading = true;
  showCity = true;
  constructor(private store: StoreService) { }

  ngOnInit() {


    // this.store.get('/cities', {}).subscribe((res) => {
    //   //
    //   $.each(res,(index,rowvalue)=> {
    //     $("#citySelected").append($("<option>",{text : rowvalue , value : rowvalue }));
    //   });
    //
    // });

    this.submitQuery();
  }

  submitQuery() {

    this.isLoading = true;

    setTimeout(() => {
      var queryType = $("#queryType").val();
      var selectedCity = $("#citySelected").val();
      this.store.get('/map?query=' + queryType + '&city=' + selectedCity + '&month=' + $("#month").val(), {}).subscribe((res) => {
        //
        this.apiResponse = res;
        this.isLoading = false;
        this.collapse();
        //
      });
    }, 1000);

  }

  changeQuery(e) {
    if (["TOTAL_COST_TO", "TOTAL_COST_FROM", "TOTAL_PASSENGER_TO", "TOTAL_PASSENGER_FROM"].includes(e.target.value)) {
      this.showCity = false;
    } else {
      this.showCity = true;
    }
  }

  collapse() {
    if (document.getElementById("wrapper").classList.contains("collapse")) {
      // $('.wrapper').removeClass('collapse');
    }
    else {
      $('.wrapper').addClass('collapse');
    }
  }
}
