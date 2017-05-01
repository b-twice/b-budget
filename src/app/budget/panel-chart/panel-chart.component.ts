import { Component, OnInit } from '@angular/core';
import { PanelChartService } from './panel-chart.service';

@Component({
  selector: 'budget-panel-chart',
  templateUrl: './panel-chart.component.html',
  styleUrls: ['./panel-chart.component.scss']
})
export class PanelChartComponent implements OnInit {

  chartData: any[];

  constructor(
    public panelChartService: PanelChartService
  ) { }

  ngOnInit() {
    this.panelChartService.data$.subscribe(r => this.chartData = r);
  }

}
