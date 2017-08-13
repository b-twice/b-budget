import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() xProperty: string;
  @Input() yProperty: string;
  @Input() width: number = 1120;
  @Input() height: number = 220;
  @Input() marginTop: number = 20;
  @Input() marginBottom: number = 30;
  @Input() marginLeft: number = 50;
  @Input() marginRight: number = 20;
  @Input() xTicks: number = 0;
  @Input() yTicks: number = 5;
  @Input() lineCurve: any = d3.curveLinear;
  @Input() yMax: number = 5000;

  chart: d3.Selection<any, any, any, any>;
  xAxis: any;
  yAxis: any;
  xDomain: d3.ScalePoint<string>;
  yDomain: d3.ScaleLinear<number, number>;
  line: d3.Line<{ key: string, value: number }>;

  drawActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  update(data) {
    console.log("Updating chart")
    // parse and scale data again
    let entries = this.parseData(data, this.xProperty, this.yProperty);
    this.xDomain.domain(entries.map(d => d.key));
    this.yDomain.domain([0, d3.max(entries.map(d => d.value))]);
    // this.yDomain.domain(d3.extent(entries, d => d.value));

    this.xAxis = this.createXAxis(this.xDomain);
    this.yAxis = this.createYAxis(this.yDomain, this.yTicks)
    //update graph
    let chart = d3.select(".chart").transition();
    chart.select(".chart-line")   // change the line
      .duration(750)
      .attr("d", this.line(entries));
    chart.select(".x.axis") // change the x axis
      .duration(750)
      .call(this.xAxis);
    chart.select(".y.axis") // change the y axis
      .duration(750)
      .call(this.yAxis);
  }


  draw(data) {
    console.log("Drawing Chart")
    this.chart = this.addChartContainer(this.width, this.height);

    // need to calculate width of chart within margins, so that chart doesn't extend to full boundaries of svg
    let chartWidth = this.calculateChartWidth(this.width, this.marginLeft, this.marginRight);
    let chartHeight = this.calculateChartHeight(this.height, this.marginTop, this.marginBottom);

    let entries = this.parseData(data, this.xProperty, this.yProperty);

    //http://codepen.io/levvsha/pen/gWbXdm
    this.xDomain = this.createDomainPointScale(0, chartWidth);
    this.yDomain = this.createDomainLinearScale(chartHeight, 0);
    // this.xDomain = d3.scalePoint<string>().range([0, width])
    // this.yDomain = d3.scaleLinear().rangeRound([height, 0]);
    // assign data type of data to line
    this.line = this.createLine(this.lineCurve, this.xDomain, this.yDomain);
    // x domain
    this.xDomain.domain(entries.map(d => d.key));
    this.yDomain.domain([0, d3.max(entries.map(d => d.value))]);
    // this.yDomain.domain([0, this.yMax]);
    // this.yDomain.domain(d3.extent(entries, d => d.value));
    this.xAxis = this.createXAxis(this.xDomain);
    this.yAxis = this.createYAxis(this.yDomain, this.yTicks)


    let g = this.addChartGroup(this.chart, this.marginLeft, this.marginTop);
    this.addXAxis(g, chartHeight, this.xAxis);
    this.addYAxis(g, this.yAxis, "Amount ($)");

    this.addPath(g, entries, this.line);
    this.drawActive = true;
  }

  parseData(data, xProperty, yProperty) {
    let parseTime = d3.timeParse("%m");
    let formatTime = d3.timeFormat("%b");
    return d3.nest<{}, number>()
      .key(d => d[xProperty]) // group data by unique values
      // rollup data into object  
      .rollup(d => d3.sum(d, g => g[yProperty])).entries(data)
      // sort objects by date
      .sort((a, b) => d3.ascending(a.key, b.key))
      // prettify data here
      .map(d => { return { key: formatTime(parseTime(d.key)), value: d.value } })

  }


  addChartContainer(width: number, height: number): d3.Selection<any, any, any, any> {
    return d3.select(".chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  }
  // Inset the chart components (xaxis, yaxis, path) within the margins of the chart
  addChartGroup(chartSvg: any, marginLeft: number, marginTop: number): d3.Selection<any, any, any, any> {
    return chartSvg.append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);
  }
  addXAxis(chartGroup: d3.Selection<Element, any, any, any>, chartHeight: number, xAxis: any): void {
    chartGroup.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis)
      .attr("class", "x axis");
  }
  addYAxis(chartGroup: d3.Selection<Element, any, any, any>, yAxis: any, label: string): void {
    chartGroup.append("g")
      .call(yAxis)
      .attr("class", "y axis")
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(label)
  }

  calculateChartWidth(width: number, marginLeft: number, marginRight: number): number {
    return width - marginLeft - marginRight;
  }
  calculateChartHeight(height: number, marginTop: number, marginBottom: number): number {
    return height - marginTop - marginBottom;
  }

  createLine(lineCurve: any, xDomain: d3.ScalePoint<string>, yDomain: d3.ScaleLinear<number, number>): d3.Line<{ key: string, value: number }> {
    return d3.line<{ key: string, value: number }>()
      .curve(lineCurve)
      .x(d => xDomain(d["key"]))  // use attribute to avoid type errors
      .y(d => yDomain(d["value"]));
  }
  addPath(g: d3.Selection<Element, any, any, any>, data, line): void {
    g.append("path")
      .datum(data)
      .attr("d", line)
      .classed("chart-line", true);
  }

  createDomainPointScale(start: number, end: number): d3.ScalePoint<string> {
    return d3.scalePoint<string>().range([start, end]);
  }

  createDomainLinearScale(start: number, end: number): d3.ScaleLinear<number, number> {
    return d3.scaleLinear().rangeRound([start, end]);
  }

  createXAxis(xDomain): d3.Axis<{}> {
    return d3.axisBottom(xDomain);
  }
  createYAxis(yDomain, ticks): d3.Axis<{}> {
    return d3.axisLeft(yDomain);
  }


}
