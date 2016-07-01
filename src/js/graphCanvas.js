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
            data: {}
            
        },
        components: {
            dataFields: {
                type: "floe.dataDashboard.graphCanvas.dataFields",
                container: "{graphCanvas}.dom.dataFields",
                model: {

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
            
        }

    });

})(jQuery, fluid);