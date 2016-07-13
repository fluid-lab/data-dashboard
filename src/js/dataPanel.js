/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function ($, fluid, Papa) {

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
            parser: "csv"//Will default CSV for now
        },
        events: {
            dataReady: null,
            startParse: null
        },
        listeners: {
            startParse: "floe.dataDashboard.dataPanel.parseRawData",
            "onCreate.buttonBindings" : "floe.dataDashboard.dataPanel.bindTheButtons"

        }
        
    });

    floe.dataDashboard.dataPanel.bindTheButtons = function (that) {
        //Will eventually also use this for data format button
        that.locate("parseButton").on("change", function () {
            that.events.startParse.fire();
        })
    }


    floe.dataDashboard.dataPanel.parseRawData = function (that) {
        // May eventually consider doing the syntax validation separately in some kind of auto-parser that checks validity while typing.

        // This function should grab the raw data string and, using the currently selected format, and pass it through the PapaParser
        var dataStr = that.locate("rawText").val();
        that.applier.change("rawData", dataStr);
        that.events.dataReady.fire();

        // if (that.model.parser == "csv") {
        //     var goodStuff = Papa.parse(dataStr);
        //     if (goodStuff.errors.length == 0 ) {
        //         myData = {
        //             fields: goodStuff.data[0],
        //             data: goodstuff.data.slice(1)
        //         };
        //         that.applier.change("parsedData", myData);
        //         that.events.dataReady.fire();
        //     } else {
        //         // Set background to red, give feedback message
        //     }
        // }

    }



})(jQuery, fluid, Papa);