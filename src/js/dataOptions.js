(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas.dataOptions", {
        gradeNames: ["fluid.viewComponent"],
        events: {
            dataSelectionContext: null,
            graphAdjustment: null
        },
        model: {
            graphType: "{floe.dataDashboard.graphSelector}.model.graph"
        },
        listeners: {
            "onCreate.setOptionButtons": {
                funcName: "floe.dataDashboard.graphCanvas.dataOptions.setOptions",
                args: ["{that}"]
            }
        }

    });

    floe.dataDashboard.graphCanvas.dataOptions.setOptions = function ( that ) {

        // Will eventually want to either have multiple components or use options to set up for different graph types

        

    };

})(jQuery, fluid);