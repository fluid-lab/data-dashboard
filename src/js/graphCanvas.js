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
        components: {

        }

    });

})(jQuery, fluid);