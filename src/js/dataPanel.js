/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function ($, fluid, d3) {

    "use strict";

    fluid.defaults("floe.dataDashboard.dataPanel", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            rawText: ".floec-rawDataEntry",
            parseButton: ".floec-parseButton",
            parserType: ".floec-parser"
            //Will add this after basic version works
            //sourceType: ".floec"
        },
        strings: {
            defaultEntryText: "Copy/Paste or Type your raw data here",
            errorText: "Sorry we were unable to parse your data, please verify there are no errors and try again.",
            successText: "Data parsed and ready for use!"
        },
        model: {
            rawData: null,
            parser: "csv" //Will default CSV for now
        },
        events: {
            dataReady: null,
            startParse: null
        },
        listeners: {
            startParse: {
                funcName: "floe.dataDashboard.dataPanel.parseRawData",
                args: ["{that}"]
            },
            "onCreate.buttonBindings" : "floe.dataDashboard.dataPanel.bindTheButtons"

        }
        
    });

    floe.dataDashboard.dataPanel.bindTheButtons = function (that) {
        //Will eventually also use this for data format button
        that.locate("parseButton").on("click", function () {
            console.log("fire worked")
            that.events.startParse.fire();
        })
    }


    floe.dataDashboard.dataPanel.parseRawData = function (that) {
        // May eventually consider doing the syntax validation separately in some kind of auto-parser that checks validity while typing.

        // This function should grab the raw data string and, using the currently selected format, and pass it through the PapaParser
        console.log(that);
        var dataStr = that.locate("rawText").val();
        if (that.model.parser == "csv") {
            var data = d3.csvParse(dataStr)
        }
    
        that.applier.change("rawData", data);
        that.events.dataReady.fire();

    }



})(jQuery, fluid, d3);