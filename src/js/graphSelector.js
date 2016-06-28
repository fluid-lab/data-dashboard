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
            graphSelection: ".floec-graphSelecter",
        },
        strings: {
            defaultText: "Please choose a graph type."
        },
        model: {
            graph: {
                // type: String
                // Tells us which graph template we're going to load
            }
        },
        listeners: {
            "onCreate.setSelectorOptions" : "floe.dataDashboard.graphSelector.setOptions",
            "onCreate.bindDOMChange" : "floe.dataDashboard.graphSelector.optionsBinding"
                
        }

    });

    floe.dataDashboard.graphSelector.optionsBinding = function (that) {
        var selector = that.locate("graphSelection");
        selector.on("change", function () {
            that.applier.change("graph", selector.val());
        });
    };

    floe.dataDashboard.graphSelector.setOptions = function (that) {
        var options = [ 
            { value: "pie", name: "Pie Chart" },
            { value: "line", name: "Line Graph" }
        ]
        var selector = that.locate("graphSelection");

        fluid.each(options, function (ind, val) {
            var newOption = "<option value=" + val.value + ">" + val.name + "</option>";
            selector.append(newOption);
        });
    };

})(jQuery, fluid);