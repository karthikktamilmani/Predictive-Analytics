import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

  isLoaded=false;
  selectedMonthCost:string;
  optimalTimePeriod:string;
  barObjCons:any;
  constructor(private store: StoreService) { }

  ngOnInit() {

    this.submitQuery();
  }

  submitQuery(){

    this.isLoaded=false;

    setTimeout(() => {
      var source= $("#sourceSel").val();
      var destination = $("#desSel").val();
      var peopleCount = $("#peopleCount").val();
      var currentMonth = $("#month option:selected").text();
      var labelObj = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      this.store.get('/get-predictions?origin='+source+'&destination='+destination+'&month='+currentMonth+'&number='+peopleCount+'&majorclass=Economy', {}).subscribe((res) => {
          //
          var predObj = res["preds"];
          var costObj = predObj["costs"];
          //
          this.selectedMonthCost= costObj[currentMonth].toFixed(3);
          //
          var optTime = res["optimal_time"];
          //
          this.optimalTimePeriod="before ";
          if( optTime > 0 )
          {
            this.optimalTimePeriod="after ";
          }
          //
          this.optimalTimePeriod = this.optimalTimePeriod + optTime;
          //
          var currentMonthIndex = labelObj.indexOf(currentMonth);
          var selectedMonths = [];
          //
          if( currentMonthIndex < 2 )
          {
            if( currentMonthIndex == 0)
            {
              selectedMonths.push(labelObj[10]);
              selectedMonths.push(labelObj[11]);
            }
            else
            {
              selectedMonths.push(labelObj[11]);
              selectedMonths.push(labelObj[0]);
            }
            selectedMonths.push(labelObj[currentMonthIndex+1]);
            selectedMonths.push(labelObj[currentMonthIndex+2]);
          }
          else{
            selectedMonths.push(labelObj[currentMonthIndex-2]);
            selectedMonths.push(labelObj[currentMonthIndex-1]);
            selectedMonths.push(labelObj[currentMonthIndex+1]);
            selectedMonths.push(labelObj[currentMonthIndex+2]);
          }
          //
          this.barObjCons = [];
          $.each(selectedMonths,(index,rowValue)=>{

            this.barObjCons.push({month:rowValue , value: costObj[rowValue]})
          });
          //
          this.isLoaded=true;
          this.collapse();
          //
        });
    },1000);

  }


  collapse() {
    if (document.getElementById("wrapper").classList.contains("collapse")) {
      // $('.wrapper').removeClass('collapse');
    } else {
      $('.wrapper').addClass('collapse');
    }
  }

}
