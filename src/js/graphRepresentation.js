(function (d3, $, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas.graphRepresentation", {
        gradeNames: ["fluid.viewComponent"],
        model: {
          x_axis: null,
          y_axis: null,
          representation: "{graphCanvas}.model.graphType"
        },
        events: {
          drawLine: null,
          drawPie: null
        },
        listeners: {
          "{graphCanvas.dataFields}.events.fieldSelection" : {
              funcName: "floe.dataDashboard.graphCanvas.graphRepresentation.binding",
              args: []
          },

          "{graphCanvas}.events.dataParsing" : {
            funcName: "floe.dataDashboard.graphCanvas.graphRepresentation.setCanvas",
            args: ["{that}"]
          },

          "drawLine": "floe.dataDashboard.graphCanvas.graphRepresentation.setLine",
          "drawPie": "floe.dataDashboard.graphCanvas.graphRepresentation.setPie"

        }


    });


    floe.dataDashboard.graphCanvas.graphRepresentation.setLine = function (that) {
      // Can eventually make these options, if we want?
      var margin = {top: 10, right: 20, left: 20, bottom: 30},
      height = 450 - margin.top - margin.bottom,
      width = 600 - margin.right - margin.left;

      //Line graph, so at least need x/y data; if one is not bound, throw error
      var x_data = that.model.x_axis;
      var y_data = that.model.y_axis;



      var x = d3.scaleLinear()
                .range()



    }

    floe.dataDashboard.graphCanvas.graphRepresentation.drawCanvas = function (that) {
      if (that.model.representation == "line" ) {
        that.events.drawLine.fire();
      } else if (that.model.representation == "pie") {
        that.events.drawPie.fire();
      }
    },


    floe.dataDashboard.graphCanvas.graphRepresentation.buildTestLine = function (that) {

        var margin = {top: 10, right: 20, left: 20, bottom: 30},
        height = 450 - margin.top - margin.bottom,
        width = 600 - margin.right - margin.left;

        //Using d3's internal parsing, prob will want different parsing later
        var data = that.model.workingData;
        console.log(data);

        //Returns a value for placement on the svg's x-axis
        var x = d3.scaleLinear()
                  .range([0, width])
                  .domain(d3.extent(data, function(d) { return +d.x; }));;

        //Returns a value for placement on the svg's y-axis
        var y = d3.scaleLinear()
                  .range([height, 0])
                  .domain(d3.extent(data, function(d) { return +d.y; }));

        console.log(d3.extent(data, function(d) { return +d.y; }));

        var xAxis = d3.axisBottom(x);


        var yAxis = d3.axisLeft(y);

        var line = d3.line()
                     .x(function(d) { return x( +d.x ); })
                     .y(function(d) { return y( +d.y ); });


        //change to contextual selector
        var svg = d3.select(".floec-graphCanvas-representation").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)

          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

    };

})(d3, jQuery, fluid);