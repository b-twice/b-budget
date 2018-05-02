import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '../../services/finance.service';
import { UserSummary } from '../../models';
import { SummaryByCategory } from './summary-by-category';
import * as d3Axis from 'd3-axis';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Collection from 'd3-collection';
import * as d3Transition from 'd3-transition';

@Component({
  selector: 'budget-panel-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.scss']
})


export class PanelSummaryChartComponent implements OnInit {

  // dimensions
  width: number = 1120;
  height: number = 500;
  // spacing
  marginTop: number = 20;
  marginBottom: number = 30;
  marginLeft: number = 50;
  marginRight: number = 100;

  // line properties
  lineCurve: d3Shape.CurveFactory = d3Shape.curveLinear;

  // containers
  chart: d3Selection.Selection<any, any, any, any>;
  chartGroup: any;
  lineGroup: any;
  xAxis: any;
  yAxis: any;
  xDomain: d3Scale.ScalePoint<number>;
  yDomain: d3Scale.ScaleLinear<number, number>;
  zDomain: d3Scale.ScaleOrdinal<any, any>;
  line: d3Shape.Line<SummaryByCategory>;

  // data
  data: Array<UserSummary>;
  entries: Array<{ key: string, values: SummaryByCategory }>;

  drawActive: boolean = false;

  categoryDisplay: {} = {
    income: "Gross Income",
    incomeTaxable: "Taxable Income",
    takeHomePay: "Take Home Pay",
    spent: "Money Spent",
    saved: "Saved",
    retirementContribution: "Retirement Contrib.",
    saving: "Savings",
    retirement: "Retirement",
    taxed: "Taxed",
  }


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
    this.apiService.getUserSummary(user, year).subscribe(data => {
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
      .attr("transform", d => "translate(" + this.xDomain(d.value.year) + "," + this.yDomain(d.value.amount) + ")")
    chart.select(".x.axis") // change the x axis
      .duration(750)
      .call(this.xAxis);
    chart.select(".y.axis") // change the y axis
      .duration(750)
      .call(this.yAxis);
  }


  draw(data) {

    // create the svg container that will hold the graph
    this.chart = d3Selection.select(".chart")
      .append("svg")
      .classed('svg-container', true)
      .attr("width", this.width)
      .attr("height", this.height);


    // need to calculate width of chart within margins, so that chart doesn't extend to full boundaries of svg
    let chartWidth = this.width - this.marginLeft - this.marginRight;
    let chartHeight = this.height - this.marginTop - this.marginBottom;

    // setup domains for data
    this.xDomain = d3Scale.scalePoint<number>().range([0, chartWidth]); // equal intervals across width of chart
    this.yDomain = d3Scale.scaleLinear().rangeRound([chartHeight, 0]); // linear range of rounded values
    this.zDomain = d3Scale.scaleOrdinal(d3Scale.schemeCategory10); // ordinal scale of colors

    // create the line that is configured to consume data
    this.line = d3Shape.line<SummaryByCategory>()
      .curve(this.lineCurve)  // make the line curvy
      .x(d => this.xDomain(d.year))  // specify x axis to use the month prop of the data
      .y(d => this.yDomain(d.amount));  // specify y axis to use the amount prop of the data

    //  build out the domains
    this.setData()

    // // build out the svg in the DOM
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
      .attr("transform", d => "translate(" + this.xDomain(d.value.year) + "," + this.yDomain(d.value.amount) + ")")
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .classed('line-label', true)
      .text(d => d.id);

  }

  // prettify and transform incoming data for consumption in chart
  parseData() {
    // flatten data to be an array of  
    let dataFlattened: SummaryByCategory[] = [];
    this.data.forEach(
      d => Object.keys(d).forEach(
        key => {
          // only display lines present in categoryDisplay
          if (this.categoryDisplay.hasOwnProperty(key)) {
            let amount: number = d[key];
            dataFlattened.push(new SummaryByCategory({ category: this.categoryDisplay[key], year: d.fiscalYear, amount: amount }))
          }
        }
      )
    );
    let entries = d3Collection.nest<SummaryByCategory, SummaryByCategory>()
      .key(d => d.category) // group data by unique values
      .entries(dataFlattened);
    this.entries = entries
    return dataFlattened;
  }

  // setup the data and scale out the domains, axis
  setData(): void {
    // transform the data
    let dataFlattened = this.parseData();

    this.xDomain.domain(dataFlattened.map(d => d.year));
    let yValues: number[] = dataFlattened.map(d => d.amount);
    this.yDomain.domain([0, yValues.reduce((a, b) => Math.max(a, b))]);

    this.zDomain(this.entries.keys);
    this.xAxis = d3Axis.axisBottom(this.xDomain);
    this.yAxis = d3Axis.axisLeft(this.yDomain);
  }

}
