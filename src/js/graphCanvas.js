/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            dataFields: ".floec-graphCanvas-fields",
            graphRepresentation: ".floec-graphCanvas-representation",
            dataOptions: ".floec-graphCanvas-options",
            buttons: ".floec-graphCanvas-buttons"
        },
        model: {
            graphType: null,
            workingData: null,
            parser: "csv"
            
        },
        components: {
            dataFields: {
                type: "floe.dataDashboard.graphCanvas.dataFields",
                container: "{graphCanvas}.dom.dataFields",
                model: {
                    fields: "{graphCanvas}.model.workingData.fields"
                }
            },
            graphRepresentation: {
                type: "floe.dataDashboard.graphCanvas.graphRepresentation",
                container: "{graphCanvas}.dom.graphRepresentation"
            },
            buttons: {
                type: "floe.dataDashboard.graphCanvas.buttons",
                container: "{graphCanvas}.dom.buttons"
            }

        },
        events: {

        },
        listeners: {
            "onCreate.testBuilder" : "floe.dataDashbaord.graphCanvas.buildTestLine"
            
        }

    });

    floe.dataDashboard.graphCanvas.buildTestLine = function (that) {
        var margin = {top: 10, right: 20, left: 20, bottom: 10},
        height = 400 - margin.top - margin.bottom,
        width = 500 - margin.right - margin.left;

        //Returns a value for placement on the svg's x-axis
        var x = d3.scale.linear()
                  .range([0, width]);

        //Returns a value for placement on the svg's y-axis
        var y = d3.scale.linear()
                  .range([height, 0]);

        var xAxis = d3.svg.axis()
                      .scale(x)
                      .orient("bottom");

        var yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left");

        var line = d3.svg.line()
                     .x(function(d) { return x( d.x ); })
                     .y(function(d) { return y( d.y ); });



        var svg = d3.select(".floec-graphCanvas-representation").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.csv.parse(that.model.workingData);

    }

})(d3, jQuery, fluid);