import { Component, OnInit, ViewChild } from '@angular/core';
import { PanelChartService } from './panel-chart.service';
import { UserTransaction } from '../models';
import { SimpleChartComponent } from '../../shared/simple-chart/simple-chart.component';

@Component({
  selector: 'budget-panel-chart',
  templateUrl: './panel-chart.component.html',
  styleUrls: ['./panel-chart.component.scss']
})
export class PanelChartComponent implements OnInit {

  @ViewChild(SimpleChartComponent)
  private simpleChart: SimpleChartComponent;

  constructor(
    public panelChartService: PanelChartService
  ) { }

  ngOnInit() {
    this.panelChartService.data$.subscribe(d => {
      console.log("new data")
      this.simpleChart.drawActive ? this.simpleChart.update(d) : this.simpleChart.draw(d)
    });
  }

}
