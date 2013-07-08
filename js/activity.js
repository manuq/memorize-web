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

        // Example game.

        var cardPairs = [
            {question: '7+1', answer: '8'},
            {question: '3+2', answer: '5'},
            {question: '2+2', answer: '4'},
            {question: '1+9', answer: '10'},
            {question: '10+1', answer: '11'},
            {question: '6+2', answer: '8'},
            {question: '7+3', answer: '10'},
            {question: '7+6', answer: '13'}
        ];

        // Utility to shuffle array elements.
        function shuffle(array) {
            var counter = array.length;
            var temp;
            var index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = (Math.random() * counter--) | 0;

                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }

        // Map the buttons to the questions and answers.
        var createMatches = function () {
            var matches = [];
            var questions = [];
            var answers = [];
            for (var i = 0; i < cardPairs.length; i ++) {
                questions.push(cardPairs[i].question);
                answers.push(cardPairs[i].answer);
            }
            console.log(questions);
            console.log(answers);
            return matches.concat(shuffle(questions), shuffle(answers));
        }

        var matches = createMatches();

        // Arrange the cards in a table.
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

        // Calculate the number of cards per row, based in the number
        // of cards.
        var cardsPerRow = Math.ceil(Math.sqrt(cardPairs.length * 2));

        var tableData = {"rows": []};
        var currentRow = [];
        for (var i = 0; i < cardPairs.length * 2; i++) {
            var suit;
            if (i < cardPairs.length) {
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

        tableElem.innerHTML = mustache.render(tableTemplate, tableData);

        // Add callback to click events of table buttons.
        var buttonPressed = function (e) {
            this.innerHTML = matches[this.getAttribute('id')];
        };

        var buttons = document.querySelectorAll("#buttons-table button");
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener('click', buttonPressed);
        }

    });

});
