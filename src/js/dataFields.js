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
            fieldTiles: ".floec-dataFields-tiles"
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
        
        var tilesDiv = that.locate("");
        console.log(tilesDiv);
        tilesDiv.append("<ol class='floec-dataFields-tiles'>");
        fluid.each(fields, function (val, index){
            var nextField = "<li value=" + val + ">" + val + "</li>";
            tilesDiv.append(nextField);
        });
        tilesDiv.append("</ol>");
        $(".floec-dataFields-tiles").on("click", "li", function () {
            var myVal = $(this).val();
            if (that.model.state == null) {
                //Throw error to user in future
                console.log(myVal);
            } else {
                that.events.fieldSelection.fire(myVal);
            }
        })

    };

    floe.dataDashboard.graphCanvas.dataFields.replaceTiles = function (that, fields) {
        //For when the selection stage changes
    }

})(d3, jQuery, fluid);

