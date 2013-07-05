define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var icon = require("sugar-web/graphics/icon");
    var mustache = require("mustache");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        // Colorize the activity icon.
        var activityButton = document.getElementById("activity-button");
        activity.getXOColor(function (error, colors) {
            icon.colorize(activityButton, colors);
        });

        // Make the activity stop with the stop button.
        var stopButton = document.getElementById("stop-button");
        stopButton.addEventListener('click', function (e) {
            activity.close();
        });

        // Create table.
        var tableElem = document.getElementById("buttons-table");

        var tableTemplate =
            '<tbody>' +
            '{{#rows}}' +
              '<tr>' +
                '{{#.}}' +
                '<td>' +
                  '<button id="{{id}}">{{suit}}</button>' +
                '</td>' +
                '{{/.}}' +
              '</tr>' +
            '{{/rows}}' +
            '</tbody>';

        tableData = {
            "rows": [
                [{"id": 1, "suit": 1}, {"id": 2, "suit": 1},
                 {"id": 3, "suit": 1}, {"id": 4, "suit": 1}],
                [{"id": 5, "suit": 1}, {"id": 6, "suit": 1},
                 {"id": 7, "suit": 1}, {"id": 8, "suit": 1}],
                [{"id": 9, "suit": 2}, {"id": 10, "suit": 2},
                 {"id": 11, "suit": 2}, {"id": 12, "suit": 2}],
                [{"id": 13, "suit": 2}, {"id": 14, "suit": 2},
                 {"id": 15, "suit": 2}, {"id": 16, "suit": 2}]
            ]
        };

        tableElem.innerHTML = mustache.render(tableTemplate, tableData);

        // Add callback to click events of table buttons.
        var buttonPressed = function (e) {
            console.log(this.getAttribute('id'));
        };

        var buttons = document.querySelectorAll("#buttons-table button");
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener('click', buttonPressed);
        }

    });

});
