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
  @Input() marginTop : number = 20;
  @Input() marginBottom: number = 30;
  @Input() marginLeft: number = 50;
  @Input() marginRight: number = 20;
  
  constructor() { }

  ngOnInit() {
    this.draw();
  }
  
  draw() {
    let svg = d3.select(".chart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    let width = this.width - this.marginLeft - this.marginRight ;
    let height = this.height - this.marginTop - this.marginBottom;

    // let parseTime = d3.timeParse("%b")
    let entries = d3.nest<{}, number>()
      .key(d => d[this.x]) // group data by unique values
      // rollup data into object  
      .rollup(d => d3.sum(d, g => g[this.y])).entries(this.data)
      .map(d => {return {key:+d.key, value:d.value}})
      // sort objects by date
      .sort((a,b) => d3.ascending(a.key, b.key));

    console.log(entries)
    console.log(this.data[0])
    let x = d3.scalePoint<number>().range([0, width])
    let y = d3.scaleLinear().rangeRound([height, 0]);
    // assign data type of data to line
    let line = d3.line<{key: number, value:number}>()
      .curve(d3.curveLinear)
      .x(d => x(d["key"]))  // use attribute to avoid type errors
      .y(d => y(d["value"]));

    // x domain
    x.domain(entries.map(d => d.key));
    y.domain([0, d3.max(entries, d => d.value)]);

    let xAxis = d3.axisBottom(x)
      .tickValues(entries.map(d=>d.key))

    let g = svg.append("g")
      .attr("transform", `translate(${this.marginLeft}, ${this.marginTop})`);

  g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

  g.append("g")
      .call(d3.axisLeft(y).ticks(5))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Amount ($)")

    g.append("path")
      .datum(entries)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }

  update() {


  }
}
