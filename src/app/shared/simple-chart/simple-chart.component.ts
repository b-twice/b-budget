import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent implements OnInit {

  @Input() data: any[];
  @Input() x: string;
  @Input() y: string;
  constructor() { }

  ngOnInit() {
  }

}
