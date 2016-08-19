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
            dataPanel: ".floec-dataPanel",
        },
        components: {
            graphSelection: {
                type: "floe.dataDashboard.graphSelector",
                //May want createOnEvent pending templating
                container: "{dataDashboard}.dom.graphSelection",
                options: {
                    //Will eventually put all listeners for selecting
                    //and clearing graphs (+ defaults?)
                },

            },
            graphCanvas: {
                type: "floe.dataDashboard.graphCanvas",
                container: "{dataDashboard}.dom.graphCanvas",
                options: {
                    //Will eventually put all listeners for selecting
                    //and clearing graphs (+ defaults?)
                },
            },
            dataPanel: {
                type: "floe.dataDashboard.dataPanel",
                container: "{dataDashboard}.dom.dataPanel",
                options: {

                    //Will eventually put all listeners for selecting
                    //and clearing graphs (+ defaults?)
                }
            }

        },
        model: {
            graphSelect: false,
            doneParsing: false,
            rawData: "{dataPanel}.model.rawData",

        },
        events: {
            readyToGraph: null,
        },
        listeners: {
            "{dataPanel}.events.dataReady" : {
                funcName: "floe.dataDashboard.checkGraphing",
                args: ["{dataDashboard}"]
            },
            "{graphSelection}.events.graphTypeSelected" : {
                funcName: "floe.dataDashboard.checkData",
                args: ["{dataDashboard}", "{arguments}.0" ]
            }
        },
    });

    floe.dataDashboard.checkGraphing = function (that) {
        that.applier.change("doneParsing", true);

        if (that.model.graphSelect) {
            that.events.readyToGraph.fire();
        } else {
            //Will want to flash/read something to the user to remind them
            //that they need to select a graph type
        }


    };

    floe.dataDashboard.checkData = function (that, selection) {
        if (selection != "unselected") {
            that.applier.change("graphSelect", true);
            if (that.model.doneParsing) {
                that.events.readyToGraph.fire();
            }

        }

    };



})(jQuery, fluid);