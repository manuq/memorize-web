define(function (require) {
    var mustache = require("mustache");

    var view = {};

    view.View = function () {
        this.template =
            '<tbody>' +
            '{{#rows}}' +
              '<tr>' +
                '{{#.}}' +
                '<td>' +
                  '<button id="{{id}}" class="suit-{{suit}} folded"></button>' +
                '</td>' +
                '{{/.}}' +
              '</tr>' +
            '{{/rows}}' +
            '</tbody>';
    };

    view.View.prototype.createView = function (cardsSet) {
        // Calculate the number of cards per row, based in the number
        // of cards.
        var cardsPerRow = Math.ceil(Math.sqrt(cardsSet.length * 2));

        var tableData = {"rows": []};
        var currentRow = [];
        for (var i = 0; i < cardsSet.length * 2; i++) {
            var suit;
            if (i < cardsSet.length) {
                suit = 1;
            }
            else {
                suit = 2;
            }
            currentRow.push({"id": i, "suit": suit});
            if (currentRow.length == cardsPerRow) {
                tableData.rows.push(currentRow);
                currentRow = [];
            }
        }

        // Arrange the cards in a table.
        var tableElem = document.getElementById("buttons-table");
        tableElem.innerHTML = mustache.render(this.template, tableData);
    };

    return view;

});
