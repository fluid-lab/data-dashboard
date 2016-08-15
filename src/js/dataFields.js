/*
Copyright 2016 Michael Warren Skirpan

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

*/

(function (d3, $, fluid) {

    "use strict";

    fluid.defaults("floe.dataDashboard.graphCanvas.dataFields", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            fieldTiles: ".floec-dataFields-tiles",
            container: ""
        },
        events: {
            fieldSelection: null
        },
        listeners: {
            "{graphCanvas}.events.dataParsed" : {
                funcName: "floe.dataDashboard.graphCanvas.dataFields.createTiles",
                args: ["{dataFields}", "{arguments}.0"]
            }
        },
        model: {
            fields: [],
            state: "{floe.dataDashboard.graphCanvas}.model.selectionState"
        }

    });

    floe.dataDashboard.graphCanvas.dataFields.createTiles = function (that, fields) {
        
        var tilesDiv = that.locate("container");
        tilesDiv.addClass("border");
        tilesDiv.append("<h2 class='floec-dataFields-head center border-bottom'>Data Fields</h2>");
        tilesDiv.append("<ol class='floec-dataFields-tiles'>");
        var list = $(".floec-dataFields-tiles");
        
        fluid.each(fields, function (val, index){
            var nextField = "<li class='border-bottom' value=" + val + ">" + val + "</li>";
            list.append(nextField);
        });
        $(".floec-dataFields-tiles").on("click", "li", function () {
            var myVal = $(this).text();
            if (that.model.state == null) {
                //Throw error to user in future
                console.log(myVal);
            } else {
                console.log("live fire");
                that.events.fieldSelection.fire(myVal);
            }
        });

    };

    floe.dataDashboard.graphCanvas.dataFields.replaceTiles = function (that, fields) {
        //For when the selection stage changes
    }

})(d3, jQuery, fluid);

