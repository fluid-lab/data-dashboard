/*
Copyright 2015-2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            //Add once I name CSS stuff
            graphSelection: ".floec-graphSelection",
            graphCanvas: ".floec-graphCanvas",
            dataEntryPanel: ".floec-dataEntryPanel"
        },
        components: {
            graphSelection: {
                type: "floe.dataDashboard.graphSelector",
                //May want createOnEvent pending templating
                container: "{dataDashboard}.dom.graphSelection",
                options: {
                    modelRelay: {
                        source: "{graphSelection}.model.graph",
                        target: "{graphCanvas}.model.graphType"
                    }
                    //Will eventually put all listeners for selecting
                    //and clearing graphs (+ defaults?)
                },

            },
            graphCanvas: {
                type: "floe.dataDashboard.graphCanvas",
                container: "{dataDashboard}.dom.graphCanvas",
                createOnEvent: "{dataDashboard}.events.onDataParsed",
                options: {
                    modelRelay: {
                        source: "{dataDashboard}.model.parsedData",
                        target: "{graphCanvas}.model.data"
                    }
                    //Will eventually put all listeners for selecting
                    //and clearing graphs (+ defaults?)
                },
            },
            dataEntryPanel: {
                type: "floe.dataDashboard.dataEntryPanel",
                container: "{dataDashboard}.dom.dataEntryPanel",
                options: {
                    modelRelay: {
                        source: "{dataEntryPanel}.model.parsedData",
                        target: "{dataDashboard}.model.parsedData"
                    }
                    //Will eventually put all listeners for selecting
                    //and clearing graphs (+ defaults?)
                },
            }

        },
        model: {
            graphSelect: false,
            parsedData: {
                fields: null,
                data: null
            },

        },
        events: {
            onDataParsed: null,
            onDataLoaded: null
        },
        listeners: {
            "floe.dataDashboard.dataPanel.dataReady" : "floe.dataDashboard.prepDataForGraphing",
            "floe.dataDashboard.graphSelection.graphTypeSelected" : "floe.dataDashboard.checkData"
        },
    });

    floe.dataDashboard.prepDataForGraphing = function (dataBlob) {
        headers = dataBlob[0];
        dataSet = datablob.slice(1);


    };

    floe.dataDashboard.checkData = function (selection) {
        if (selection != "unselected") {

        }

    };



})(jQuery, fluid);