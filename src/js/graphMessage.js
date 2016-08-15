(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphMessage", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            container: ""
        },
        listeners: {
            "{floe.dataDashboard.graphCanvas.dataOptions}.events.dataSelectionContext" : {
                funcName: "floe.dataDashboard.graphMessage.changeMessage",
                args: ["{that}", "{arguments}.0"]
            }
        }

    });

    floe.dataDashboard.graphMessage.changeMessage = function (that, state) {

        //Will want to simply look up the change in state and change the help message at the top
        //Probably will want to use options, maybe model?

        

    };

})(jQuery, fluid);