import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PanelChartService } from './panel-chart.service';
import { Transaction } from './transaction';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Collection from 'd3-collection';
import * as d3Transition from 'd3-transition';
import * as d3TimeFormat from 'd3-time-format';


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
  lineCurve: d3Shape.CurveFactory = d3Shape.curveLinear;

  // containers
  chart: d3Selection.Selection<any, any, any, any>;
  tooltip: d3Selection.Selection<any, any, any, any>;
  chartGroup: any;
  lineGroup: any;
  xAxis: any;
  yAxis: any;
  xDomain: d3Scale.ScalePoint<string>;
  yDomain: d3Scale.ScaleLinear<number, number>;
  zDomain: d3Scale.ScaleOrdinal<any, any>;
  line: d3Shape.Line<Transaction>;

  // data
  data: Array<Transaction>;
  entries: Array<{ key: string, values: Transaction[] }>;

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
    // parse and scale data again
    this.data = data;
    this.setData()
    //update graph
    let chart = d3Transition.transition(".chart")

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

    // cant do a transition because some points may not exist anymore
    // rather remove all the data and add the points back in
    this.chartGroup.selectAll(".dot")
      .remove()
    this.addPointData();
  }


  draw(data) {

    d3Selection.select('.svg-container').remove();
    // create the svg container that will hold the graph
    this.chart = d3Selection.select(".chart")
      .append("svg")
      .classed('svg-container', true)
      .attr("width", this.width)
      .attr("height", this.height);
    // Define the div for the tooltip
    this.tooltip = d3Selection.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


    // need to calculate width of chart within margins, so that chart doesn't extend to full boundaries of svg
    let chartWidth = this.width - this.marginLeft - this.marginRight;
    let chartHeight = this.height - this.marginTop - this.marginBottom;

    // setup domains for data
    this.xDomain = d3Scale.scalePoint<string>().range([0, chartWidth]); // equal intervals across width of chart
    this.yDomain = d3Scale.scaleLinear().rangeRound([chartHeight, 0]); // linear range of rounded values
    this.zDomain = d3Scale.scaleOrdinal(d3Scale.schemeCategory10); // ordinal scale of colors

    // create the line that is configured to consume data
    this.line = d3Shape.line<Transaction>()
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
    // 12. Appends a circle for each datapoint 
    this.addPointData();

    this.drawActive = true;
  }


  // prettify and transform incoming data for consumption in chart
  parseData() {
    let parseTime = d3TimeFormat.timeParse("%m");
    let formatTime = d3TimeFormat.timeFormat("%b");
    // lol doens't seem like the d3 way again, force transform data values before adding as entries
    this.data.forEach(entry => entry.month = formatTime(parseTime(entry.month)))
    let entries = d3Collection.nest<Transaction, Transaction>()
      .key(d => d.year) // group data by unique values
      .entries(this.data);
    this.entries = entries
  }

  // setup the data and scale out the domains, axis
  setData(): void {
    // transform the data
    this.parseData();

    this.xDomain.domain(this.data.map(d => d.month));
    let yValues: number[] = this.data.map(d => d.amount);
    this.yDomain.domain([0, yValues.reduce((a, b) => Math.max(a, b))]);

    this.zDomain(this.entries.keys);
    this.xAxis = d3Axis.axisBottom(this.xDomain);
    this.yAxis = d3Axis.axisLeft(this.yDomain);
  }

  // create a collection consumable for points, yes this is also not d3 like but works;
  addPointData(): void {
    var data = [];
    this.entries.map(d => d.values.map(o => { o['key'] = d.key; return data.push(o) }));
    this.chartGroup.selectAll(".dot")
      .data(data)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", (d, i) => this.xDomain(d.month))
      .attr("cy", (d) => this.yDomain(d.amount))
      .attr("r", 4)
      .style("fill", d => this.zDomain(d.key))
      .on("mouseover", d => {
        this.tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        this.tooltip.html(`$${d.amount.toLocaleString()}`)
          .style("left", (d3Selection.event.pageX) + "px")
          .style("top", (d3Selection.event.pageY - 28) + "px");
      })
      .on("mouseout", (d) =>
        this.tooltip.transition()
          .duration(500)
          .style("opacity", 0)
      );
  }

}
