(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas.graphMessage", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            container: ""
        },
        listeners: {
            "{graphCanvas.dataOptions}.events.dataSelectionContext" : {
                funcName: "floe.dataDashboard.graphCanvas.graphMessage.changeMessage",
                args: ["{that}", "{arguments}.0"]
            }
        }

    });

    floe.dataDashboard.graphCanvas.graphMessage.changeMessage = function (that, state) {

        //Will want to simply look up the change in state and change the help message at the top
        //Probably will want to use options, maybe model?

    };

})(jQuery, fluid);