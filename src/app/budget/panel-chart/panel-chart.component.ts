import { Component, OnInit, ViewChild } from '@angular/core';
import { PanelChartService } from './panel-chart.service';
import { UserTransaction } from '../models';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@Component({
  selector: 'budget-panel-chart',
  templateUrl: './panel-chart.component.html',
  styleUrls: ['./panel-chart.component.scss']
})
export class PanelChartComponent implements OnInit {

  @ViewChild(LineChartComponent)
  private LineChart: LineChartComponent;

  constructor(
    public panelChartService: PanelChartService
  ) { }

  ngOnInit() {
    this.panelChartService.data$.subscribe(d => {
      console.log("new data")
      this.LineChart.drawActive ? this.LineChart.update(d) : this.LineChart.draw(d)
    });
  }

}
