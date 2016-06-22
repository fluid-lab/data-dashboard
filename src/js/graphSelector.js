/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graph", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            graphSelection: ".floec-graphSelect",
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

    })

})(jQuery, fluid);