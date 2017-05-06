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
  @Input() width: number = 800;
  @Input() height: number = 200;
  constructor() { }

  ngOnInit() {
    let svg = d3.select(".chart").append("svg").attr("width", this.width).attr("height", this.height);




    var parseTime = d3.timeParse("%b")
    let entries = d3.nest<{}, number>()
      .key(d => d[this.x])
      .rollup(d => d3.sum(d, g => g[this.y])).entries(this.data)
      .map(d => {return {key:parseTime(d.key), value:d.value}})
      .sort((a,b) => d3.ascending(a.key, b.key));

    let x = d3.scaleTime<{}, number>().range([0, this.width]);
    let y = d3.scaleLinear().rangeRound([this.height, 0]);
    let line = d3.line<{key: Date, value:number}>()
      .x(d => x(d.key))
      .y(d => y(d.value));
    x.domain(d3.extent(entries, d => d.key));
    y.domain([0, d3.max(entries, d => d.value)]);

    let g = svg.append("g");
    g.append("path")
      .datum(entries)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

}
