/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function (d3, $, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            dataFields: ".floec-graphCanvas-fields",
            graphRepresentation: ".floec-graphCanvas-representation",
            dataOptions: ".floec-graphCanvas-options"
        },
        model: {
            graphType: "{floe.dataDashboard.graphSelector}.model.graph",
            workingData: "{floe.dataDashboard}.model.rawData",
            currentSelection: {
            },
            selectionState: "{dataOptions}.model.selectionState",
            
        },
        components: {
            dataFields: {
                type: "floe.dataDashboard.graphCanvas.dataFields",
                container: "{graphCanvas}.dom.dataFields",
            },
            graphRepresentation: {
                type: "floe.dataDashboard.graphCanvas.graphRepresentation",
                container: "{graphCanvas}.dom.graphRepresentation"
            },
            dataOptions: {
                type: "floe.dataDashboard.graphCanvas.dataOptions",
                container: "{graphCanvas}.dom.dataOptions",
                // createOnEvent: "{graphCanvas}.events.dataParsed"
            },
        },
        events: {
            dataParsed: null,

        },
        listeners: {
            //Only while testing
            "dataParsed" : {
                funcName: "floe.dataDashboard.graphCanvas.graphRepresentation.buildTestLine",
                args: ["{that}"]
            },
            "{dataDashboard}.events.readyToGraph" : {
                funcName: "floe.dataDashboard.graphCanvas.parseTheData",
                args: ["{that}"]
            }
            
        }

    });

    floe.dataDashboard.graphCanvas.parseTheData = function (that) {
        // Expect that it will have been d3 parsed; meaning it'll be in JSON format
        var fields = d3.keys(that.model.workingData[0]);
        that.events.dataParsed.fire(fields);
    }

    

})(d3, jQuery, fluid);
