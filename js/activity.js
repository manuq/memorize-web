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

        var status = "selecting question";
        var questionSelected;
        var answerSelected;
        var cardsUnfolded;

        var cardPairs = [
            {question: '7+1', answer: '8'},
            {question: '3+2', answer: '5'},
            {question: '2+2', answer: '4'},
            {question: '2+8', answer: '10'},
            {question: '10+1', answer: '11'},
            {question: '5+2', answer: '7'},
            {question: '5+4', answer: '9'},
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
                  '<button id="{{id}}" class="suit-{{suit}} folded"></button>' +
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

        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        var checkMatches = function () {
            for (var i = 0; i < cardPairs.length; i++) {
                if (cardPairs[i].question == questionSelected) {
                    if (cardPairs[i].answer == answerSelected) {
                        for (var j = 0; j < cardsUnfolded.length; j++) {
                            var elem = document.getElementById(cardsUnfolded[j]);
                            elem.classList.add('match');
                        }
                        status = "selecting question";
                    }
                    else {
                        // wait a sec, fold em again
                        window.setTimeout(function () {
                            for (var j = 0; j < cardsUnfolded.length; j++) {
                                var elem = document.getElementById(cardsUnfolded[j]);
                                elem.innerHTML = '';
                                elem.classList.add('folded');
                            }
                            status = "selecting question";
                        }, 1000);
                    }
                }
            }
        }

        // Add callback to click events of table buttons.
        var buttonPressed = function (e) {
            var id = this.getAttribute('id');
            if (status == "selecting none") {
                return;
            }
            if (status == "selecting question") {
                if (id > cardPairs.length - 1) {
                    return;
                }
            }
            if (status == "selecting answer") {
                if (id < cardPairs.length) {
                    return;
                }
            }

            this.innerHTML = matches[id];
            this.classList.remove('folded');

            if (status == "selecting question") {
                questionSelected = matches[id];
                cardsUnfolded = [id];
                status = "selecting answer";
            }
            else {
                if (status == "selecting answer") {
                    answerSelected = matches[id];
                    cardsUnfolded.push(id);
                    status = "selecting none";
                    checkMatches();
                }
            }
        };

        var buttons = document.querySelectorAll("#buttons-table button");
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener('click', buttonPressed);
        }

    });

});
