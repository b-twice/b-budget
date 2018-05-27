import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../../services/finance.service';
import { SpendingByCategory } from './spending-by-category';
import { Expense } from '../../../models/finance';
import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Collection from 'd3-collection';
import * as d3Transition from 'd3-transition';

@Component({
  selector: 'budget-panel-spending-chart',
  templateUrl: './spending-chart.component.html',
  styleUrls: ['./spending-chart.component.scss']
})


export class PanelSpendingChartComponent implements OnInit {

  // dimensions
  width: number = 1120;
  height: number = 500;
  // spacing
  marginTop: number = 20;
  marginBottom: number = 80;
  marginLeft: number = 40;
  marginRight: number = 20;

  // containers
  chart: d3Selection.Selection<any, any, any, any>;
  chartGroup: any;
  tooltip: d3Selection.Selection<any, any, any, any>;
  lineGroup: any;
  xAxis: any;
  yAxis: any;
  xDomain: d3Scale.ScalePoint<string>;
  yDomain: d3Scale.ScaleLinear<number, number>;
  bar: any;

  // data
  data: Array<Expense>;
  entries: Array<{ key: string, value: number }>;

  drawActive: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public apiService: FinanceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params =>
        this.activate(params['user'], params['year'])
    )
  }

  activate(user, year) {
    this.apiService.getExpense(user, year, []).subscribe(data => {
      this.data = data;
      if (this.drawActive) {
        this.update(data);
      }
      else {
        this.draw(data);
        this.drawActive = true;
      }
    })
  }

  update(data) {
    // parse and scale data again
    this.setData();
    //update graph
    let chart = d3Transition.transition(".spending-chart");

    // data that needs DOM = enter() (a set/selection, not an event!)
    let chartHeight = this.height - this.marginTop - this.marginBottom;

    var bars = this.chartGroup.selectAll(".spending-bar")
      .remove()
      .exit()
      .data(this.entries);

    bars.enter().append("rect")
      .attr("class", "spending-bar")
      .attr("x", d => this.xDomain(d.key))
      .attr("y", d => this.yDomain(d.value))
      .attr("width", this.xDomain.bandwidth())
      .attr("height", d => chartHeight - this.yDomain(d.value));

    chart.select(".spending-x.spending-axis") // change the x axis
      .duration(750)
      .call(this.xAxis);
    chart.select(".spending-y.spending-axis") // change the y axis
      .duration(750)
      .call(this.yAxis);
  }


  draw(data) {

    // create the svg container that will hold the graph
    this.chart = d3Selection.select(".spending-chart")
      .append("svg")
      .classed('spending-svg-container', true)
      .attr("width", this.width)
      .attr("height", this.height);
    // Define the div for the tooltip
    this.tooltip = d3Selection.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);



    // need to calculate width of chart within margins, so that chart doesn't extend to full boundaries of svg
    let chartWidth = this.width - this.marginLeft - this.marginRight;
    let chartHeight = this.height - this.marginTop - this.marginBottom;
    let chartRadius = Math.min(chartWidth, chartHeight) / 2;

    // setup domains for data
    this.xDomain = d3Scale.scaleBand<string>().range([0, chartWidth]).padding(0.1); // equal intervals across width of chart
    // var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    this.yDomain = d3Scale.scaleLinear().rangeRound([chartHeight, 0]); // linear range of rounded values

    // //  build out the domains
    this.setData()

    // build out the svg in the DOM
    this.chartGroup = this.chart.append("g")
      .attr("transform", `translate(${this.marginLeft}, ${this.marginRight})`)

    // add the x and y axis
    this.chartGroup.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(this.xAxis)
      .attr("class", "spending-x spending-axis")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-65)");
    this.chartGroup.append("g")
      .call(this.yAxis)
      .attr("class", "spending-y spending-axis")
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Amount ($)");

    this.chartGroup.selectAll(".spending-bar")
      .data(this.entries)
      .enter().append("rect")
      .attr("class", "spending-bar")
      .attr("x", d => this.xDomain(d.key))
      .attr("y", d => this.yDomain(d.value))
      .attr("width", this.xDomain.bandwidth())
      .attr("height", d => chartHeight - this.yDomain(d.value))
      .on("mouseover", d => {
        this.tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        this.tooltip.html(`$${d.value.toLocaleString()}`)
          .style("left", (d3Selection.event.pageX) + "px")
          .style("top", (d3Selection.event.pageY - 28) + "px");
      })
      .on("mouseout", (d) =>
        this.tooltip.transition()
          .duration(500)
          .style("opacity", 0)
      );

  }

  // prettify and transform incoming data for consumption in chart
  parseData() {
    this.entries = d3Collection.nest<Expense, number>()
      .key(d => d.categoryName) // group data by unique values
      .rollup(d => d.map(d => d.actualExpense).reduce((a, b) => a + b))
      .entries(this.data);
  }

  // setup the data and scale out the domains, axis
  setData(): void {
    // transform the data
    this.parseData();


    this.xDomain.domain(this.data.map(d => d.categoryName));
    let yValues: number[] = this.entries.map(d => d.value);
    this.yDomain.domain([0, yValues.reduce((a, b) => Math.max(a, b))]);

    this.xAxis = d3Axis.axisBottom(this.xDomain);
    this.yAxis = d3Axis.axisLeft(this.yDomain);

  }

}
