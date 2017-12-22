(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas.dataOptions", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            graphType: "{floe.dataDashboard.graphCanvas}.model.graphType",
            selectionState: "default"
        },
        events: {
            dataSelectionContext: null,
            graphAdjustment: null
        },
        selectors: {
            container: ""
        },
        listeners: {
            "{graphCanvas}.events.dataParsed": {
                funcName: "floe.dataDashboard.graphCanvas.dataOptions.setOptions",
                args: ["{that}"]
            }
        }

    });

    floe.dataDashboard.graphCanvas.dataOptions.setOptions = function ( that ) {

        // Will eventually want to either have multiple components or use options to set up for different graph types

        var optionsDiv = that.locate("container");

        if (that.model.graphType == "line") {
            optionsDiv.append("<button class='bind-x m1 p1'>Bind X Axis</button>");
            optionsDiv.append("<button class='bind-y m1 p1'>Bind Y Axis</button>");

            $('.bind-x').on("click", function () {
                if (that.model.selectionState == "default") {
                    $(this).css("background-color", "red");
                    that.applier.change("selectionState", ["bind", "x"]);

                    that.events.dataSelectionContext.fire("bind");
                } else {
                    $(this).css("background-color", "grey");
                    that.applier.change("selectionState", "default");
                }

            });

            $('.bind-y').on("click", function () {
                if (that.model.selectionState == "default") {
                    $(this).css("background-color", "red");
                    that.applier.change("selectionState", ["bind", "y"]);

                    that.events.dataSelectionContext.fire("bind");
                } else {
                    $(this).css("background-color", "grey");
                    that.applier.change("selectionState", "default");
                }

            });

        }

    };

})(jQuery, fluid);