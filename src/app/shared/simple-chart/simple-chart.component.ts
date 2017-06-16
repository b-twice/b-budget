import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent implements OnInit {

  @Input() xProperty: string;
  @Input() yProperty: string;
  @Input() width: number = 800;
  @Input() height: number = 200;
  @Input() marginTop: number = 20;
  @Input() marginBottom: number = 30;
  @Input() marginLeft: number = 50;
  @Input() marginRight: number = 20;


  chart: any;
  xAxis: any;
  yAxis: any;
  xDomain: any;
  yDomain: any;
  line: any;

  drawActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  update(data) {
    console.log("Updating chart")

    // parse and scale data again
    let entries = this.parseData(data);
    this.xDomain.domain(entries.map(d => d.key));
    this.yDomain.domain([0, d3.max(entries, d => d.value)]);

    // this.xAxis = d3.axisBottom(this.xDomain);
    // this.yAxis = d3.axisLeft(this.yDomain).ticks(5);
    //update graph
    let chart = d3.select(".chart").transition();
    chart.select(".line")   // change the line
      .duration(750)
      .attr("d", this.line(entries));
    chart.select(".x.axis") // change the x axis
      .duration(750)
      .call(this.xAxis);
    chart.select(".y.axis") // change the y axis
      .duration(750)
      .call(this.yAxis);
  }

  parseData(data) {
    // let parseTime = d3.timeParse("%b")
    return d3.nest<{}, number>()
      .key(d => d[this.xProperty]) // group data by unique values
      // rollup data into object  
      .rollup(d => d3.sum(d, g => g[this.yProperty])).entries(data)
      .map(d => { return { key: d.key, value: d.value } })
      // sort objects by date
      .sort((a, b) => d3.ascending(a.key, b.key));


  }
  draw(data) {
    console.log("Drawing Chart")
    this.chart = d3.select(".chart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    let width = this.width - this.marginLeft - this.marginRight;
    let height = this.height - this.marginTop - this.marginBottom;

    let entries = this.parseData(data);
    //http://codepen.io/levvsha/pen/gWbXdm
    console.log(entries)
    console.log(data[0])
    this.xDomain = d3.scalePoint<string>().range([0, width])
    this.yDomain = d3.scaleLinear().rangeRound([height, 0]);
    // assign data type of data to line
    this.line = d3.line<{ key: string, value: number }>()
      .curve(d3.curveLinear)
      .x(d => this.xDomain(d["key"]))  // use attribute to avoid type errors
      .y(d => this.yDomain(d["value"]));

    // x domain
    this.xDomain.domain(entries.map(d => d.key));
    // x.domain(entries.map(d => d3.timeFormat('%b')(d3.timeParse('%m')(d.key))));
    this.yDomain.domain([0, d3.max(entries, d => d.value)]);

    // console.log(entries.map(e=> d3.timeFormat('%b')(d3.timeParse('%m')(e.key))))
    this.xAxis = d3.axisBottom(this.xDomain);
    this.yAxis = d3.axisLeft(this.yDomain).ticks(5);

    let g = this.chart.append("g")
      .attr("transform", `translate(${this.marginLeft}, ${this.marginTop})`);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(this.xAxis)
      .attr("class", "x axis");

    g.append("g")
      .call(this.yAxis)
      .attr("class", "y axis")
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
      .attr("d", this.line)
      .attr("class", "line");
    this.drawActive = true;
  }

}
