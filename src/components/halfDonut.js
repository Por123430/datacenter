import React, { Component } from "react";
import * as d3 from "d3";

import "../styles/monitor.css";

const HEIGHT = 250;
//const WIDTH = 565;
let WIDTH = 0;

const OFFSET_TOP = 30;
const OFFSET_BOTTOM = 30;
//const OFFSET_LEFT = 30;
//const OFFSET_RIGHT = 30;

let RADIUS = 0;
//const RADIUS = Math.min(WIDTH, HEIGHT) / 2;
const COLOR_RANGE = ["#17A2B8", "#FFC107", "#DC3545", "#28A745"];

class HalfDonutChart extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    console.log("Cargado!!!");
    let colors = d3.scaleOrdinal().range(COLOR_RANGE);
    let canvas = this.setCanvas();
    let arc = this.setArc();
    let pie = this.setPie();
    this.setArcs(canvas, arc, pie, colors);
    this.setLegend(canvas, this.props.data);
    this.setState({
      loaded: true
    });
  }

  setArc() {
    return d3
      .arc() //this will create <path> elements for us using arc data
      .innerRadius(50)
      .outerRadius(RADIUS);
  }

  setArcs(canvas, arc, pie, colors) {
    let arcs = canvas
      .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
      .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
      .attr("class", "slice"); //allow us to style things in the slices (like text)

    arcs
      .append("svg:path")
      .attr("fill", function(d, i) {
        return colors(i);
      }) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc);

    //We center the text inside the arc
    arcs
      .append("svg:text")
      .attr("transform", function(d) {
        var textWidth = getTextWidth(
          (d.value.toFixed(2) + "%").toString(),
          "Roboto"
        );
        console.log(
          "d.value: " +
            d.value +
            " textWidth: " +
            textWidth +
            " arc.centroid(d)[0]: " +
            arc.centroid(d)[0]
        );
        let x = arc.centroid(d)[0] - textWidth / 2;
        let y = arc.centroid(d)[1];
        return "translate(" + x + "," + y + ")";
      })
      .attr("class", "label-half-donut")
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) {
        // are we past the center?
        return (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start";
      })
      .text(function(d) {
        return d.value.toFixed(2) + "%";
      });

    function getTextWidth(text, font) {
      var canvas =
        getTextWidth.canvas ||
        (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
    }
  }

  setCanvas() {
    WIDTH = parseFloat(d3.select("#" + this.props.idContainer).style("width"));
    RADIUS = Math.min(WIDTH, HEIGHT) / 2;
    let svg = d3
      .select("#" + this.props.idContainer)
      .append("svg")
      .style("background-color", "#354560")
      .style("color", "#FFFFFF") //With this we've got the color of the axis too
      .data([this.props.data]) //associate our data with the document
      .attr("width", WIDTH) //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", HEIGHT)
      .append("svg:g") //make a group to hold our pie chart
      .attr(
        "transform",
        "translate(" +
          WIDTH / 2 +
          "," +
          (HEIGHT + OFFSET_TOP + OFFSET_BOTTOM + 50) / 2 +
          ")"
      );

    svg
      .append("g")
      .append("text")
      .attr("transform", "translate(0, 25)")
      .style("text-anchor", "middle")
      .text("Distribución de posesiones")
      .attr("class", "title");

    return svg;
  }

  /**
   * We draw with this function to create a legend dymamically on the right of
   * the graphic
   * @param {*} canvas
   * @param {*} data
   */
  setLegend(canvas, data) {
    let colors = d3
      .scaleOrdinal()
      .domain(COLOR_RANGE)
      .range(COLOR_RANGE);

    let svg = canvas.append("g").attr("transform", "translate(185, -100)");

    svg
      .selectAll("squares")
      .data(COLOR_RANGE)
      .enter()
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("x", 0)
      .attr("y", function(d, i) {
        return i * 20;
      })
      .style("fill", function(d) {
        return colors(d);
      });

    svg
      .selectAll("labels")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", function(d, i) {
        return (i + 0.55) * 20;
      })
      .text(function(d) {
        return d.label + "%";
      })
      .attr("class", "label-half-donut")
      .attr("text-anchor", "left")
      .style("alignment-baseline", "bottom");
  }

  setPie() {
    return d3
      .pie() //this will create arc data for us given a list of values
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180))
      .padAngle(0.02) // some space between slices
      .sort(null) //No! we don't want to order it by size
      .value(function(d) {
        return d.value;
      });
  }

  render() {
    return (
      <div>
        <div id={this.props.idContainer} />
      </div>
    );
  }
}

// module.exports.HalfDonutChart = HalfDonutChart;
export default HalfDonutChart;