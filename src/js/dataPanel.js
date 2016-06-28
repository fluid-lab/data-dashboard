/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.dataPanel", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            rawText: ".floec-rawDataEntry",
            parseButton: ".foec-parseButton",
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
            rawData: {
                // dataStr: string
                // May not even need
            },
            parsedData: {
                // data: Object
                // PapaParse returns an array of arrays for CSV
                // first array are headers, each subsequent array is a row
            },
            parser: {
                // type: String
                //Used to choose which parser we run
            }
        },
        events: {
            dataReady: null,
            startParse: null
        }
        listeners: {
            "floe.dataDashboard.dataPanel.startParse": "floe.dataDashboard.dataPanel.parseRawData",

        }
        
    });

    floe.dataDashboard.dataPanel.parseRawData = function(that) {
        // May eventually consider doing the syntax validation separately in some kind of auto-parser that checks validity while typing.

        // This function should grab the raw data string and, using the currently selected format, and pass it through the PapaParser
        var dataStr = that.locate("rawText").val();
        if (that.model.parser == "csv") {
            var goodStuff = Papa.parse(dataStr);
            that.applier.change("parsedData", goodStuff);
        }

    }



})(jQuery, fluid, Papa);