import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PanelChartService } from './panel-chart.service';
import { UserTransaction } from '../../models';
import * as d3 from 'd3';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'budget-panel-chart',
  templateUrl: './panel-chart.component.html',
  styleUrls: ['./panel-chart.component.scss']
})
export class PanelChartComponent implements OnInit, OnDestroy {

  // dimensions
  width: number = 1120;
  height: number = 220;
  // spacing
  marginTop: number = 20;
  marginBottom: number = 30;
  marginLeft: number = 50;
  marginRight: number = 35;

  // line properties
  lineCurve: any = d3.curveLinear;

  // containers
  chart: d3.Selection<any, any, any, any>;
  chartGroup: any;
  lineGroup: any;
  xAxis: any;
  yAxis: any;
  xDomain: d3.ScalePoint<string>;
  yDomain: d3.ScaleLinear<number, number>;
  zDomain: d3.ScaleOrdinal<any, any>;
  line: d3.Line<{ month: string, amount: number }>;

  // data
  data: Array<{ year: string, month: string, amount: number }>;
  entries: Array<{ key: string, values: { amount: number, month: string } }>;

  drawActive: boolean = false;

  ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    public panelChartService: PanelChartService
  ) { }

  ngOnInit() {
    this.panelChartService.updateData$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(d => {
        this.drawActive ? this.update(d) : this.draw(d)
      });
    this.panelChartService.drawData$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(d => {
        this.draw(d)
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  update(data) {
    console.log("Updating chart")
    // parse and scale data again
    this.data = data;
    this.setData()
    //update graph
    let chart = d3.select(".chart").transition();

    this.lineGroup.data(this.entries)

    this.lineGroup.select('.line')
      .transition()
      .duration(750)
      .attr("d", d => this.line(d.values))

    this.lineGroup.select('.line-label')
      .datum(function (d) { return { id: d.key, value: d.values[d.values.length - 1] }; })
      .transition()
      .duration(750)
      .attr("transform", d => "translate(" + this.xDomain(d.value.month) + "," + this.yDomain(d.value.amount) + ")")
    chart.select(".x.axis") // change the x axis
      .duration(750)
      .call(this.xAxis);
    chart.select(".y.axis") // change the y axis
      .duration(750)
      .call(this.yAxis);
  }


  draw(data) {
    console.log("Drawing Chart")

    d3.select('.svg-container').remove();
    // create the svg container that will hold the graph
    this.chart = d3.select(".chart")
      .append("svg")
      .classed('svg-container', true)
      .attr("width", this.width)
      .attr("height", this.height);


    // need to calculate width of chart within margins, so that chart doesn't extend to full boundaries of svg
    let chartWidth = this.width - this.marginLeft - this.marginRight;
    let chartHeight = this.height - this.marginTop - this.marginBottom;

    // setup domains for data
    this.xDomain = d3.scalePoint<string>().range([0, chartWidth]); // equal intervals across width of chart
    this.yDomain = d3.scaleLinear().rangeRound([chartHeight, 0]); // linear range of rounded values
    this.zDomain = d3.scaleOrdinal(d3.schemeCategory10); // ordinal scale of colors

    // create the line that is configured to consume data
    this.line = d3.line<{ year: string, month: string, amount: number }>()
      .curve(this.lineCurve)  // make the line curvy
      .x(d => this.xDomain(d.month))  // specify x axis to use the month prop of the data
      .y(d => this.yDomain(d.amount));  // specify y axis to use the amount prop of the data

    //  build out the domains
    this.data = data;
    this.setData()

    // build out the svg in the DOM
    this.chartGroup = this.chart.append("g")
      .attr("transform", `translate(${this.marginLeft}, ${this.marginTop})`);

    // add the x and y axis
    this.chartGroup.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(this.xAxis)
      .attr("class", "x axis");
    this.chartGroup.append("g")
      .call(this.yAxis)
      .attr("class", "y axis")
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Amount ($)")

    // create the lines, each line will go into a group that will hold the line + text
    this.lineGroup = this.chartGroup.selectAll(".line-group")
      .data(this.entries)
      .enter().append("g")
      .attr("class", "line-group");

    // draw the lines
    this.lineGroup.append("path")
      .attr("class", "line")
      .attr("d", d => this.line(d.values))
      .attr("id", d => d.key)
      .style("stroke", d => this.zDomain(d.key))

    // add label to the line
    this.lineGroup.append("text")
      .datum(function (d) { return { id: d.key, value: d.values[d.values.length - 1] }; })
      .attr("transform", d => "translate(" + this.xDomain(d.value.month) + "," + this.yDomain(d.value.amount) + ")")
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .classed('line-label', true)
      .text(d => d.id);

    this.drawActive = true;
  }

  // prettify and transform incoming data for consumption in chart
  parseData() {
    let parseTime = d3.timeParse("%m");
    let formatTime = d3.timeFormat("%b");
    // lol doens't seem like the d3 way again, force transform data values before adding as entries
    this.data.forEach(entry => entry.month = formatTime(parseTime(entry.month)))
    let entries = d3.nest<{ year: string, month: string, amount: number }, { month: string, amount: number }>()
      .key(d => d.year) // group data by unique values
      .entries(this.data);
    this.entries = entries
  }

  // setup the data and scale out the domains, axis
  setData(): void {
    // transform the data
    this.parseData();

    this.xDomain.domain(this.data.map(d => d.month));
    let xValues: number[] = this.data.map(d => d.amount);
    this.yDomain.domain([0, d3.max(xValues)]);

    this.zDomain(this.entries.keys);
    this.xAxis = d3.axisBottom(this.xDomain);
    this.yAxis = d3.axisLeft(this.yDomain);
  }

}
