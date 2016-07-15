/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphSelector", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            graphSelection: ".floec-graphSelector",
        },
        model: {
            graph: null
        },
        events: {
            graphTypeSelected: null

        },
        listeners: {
            "onCreate.setSelectorOptions" : "floe.dataDashboard.graphSelector.setOptions",
            "onCreate.bindDOMChange" : "floe.dataDashboard.graphSelector.optionsBinding"
                
        }

    });

    floe.dataDashboard.graphSelector.optionsBinding = function (that) {
        var selector = that.locate("graphSelection");
        selector.on("change", function () {
            var myVal = $(this).val();
            that.applier.change("graph", myVal);
            that.events.graphTypeSelected.fire(myVal);
        });
    };

    floe.dataDashboard.graphSelector.setOptions = function (that) {
        var options = [ 
            { value: "unselected", name: "Please choose a graph type"},
            { value: "pie", name: "Pie Chart" },
            { value: "line", name: "Line Graph" }
        ]
        var selector = that.locate("graphSelection");

        fluid.each(options, function (val, index) {
            var newOption = "<option value=" + val.value + ">" + val.name + "</option>";
            selector.append(newOption);
        });
    };

})(jQuery, fluid);