define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var icon = require("sugar-web/graphics/icon");

    var model = require("activity/model");
    var view = require("activity/view");
    var controller = require("activity/controller");

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
        var cardsSet = [
            {question: '7+1', answer: '8'},
            {question: '3+2', answer: '5'},
            {question: '2+2', answer: '4'},
            {question: '2+8', answer: '10'},
            {question: '10+1', answer: '11'},
            {question: '5+2', answer: '7'},
            {question: '5+4', answer: '9'},
            {question: '7+6', answer: '13'}
        ];

        function Memorize() {
            this.model = new model.Model();
            this.view = new view.View();
            this.controller = new controller.Controller(this.model, this.view);
        }

        memorize = new Memorize();
        memorize.model.loadGame(cardsSet);
        memorize.view.createView(cardsSet);

        // Add callback to click events of table buttons.
        var buttonPressed = function (e) {
            var cardPosition = this.getAttribute('id');

            if (memorize.model.prohibitedMove(cardPosition)) {
                return;
            }

            var result = memorize.model.selectCard(cardPosition);

            memorize.view.unfoldCard(this, result.cardContent);

            if (result.end) {
                var match = memorize.model.checkMatches();
                if (match) {
                    memorize.view.highlightCards(memorize.model.unfoldedCards);
                    memorize.model.unlockMove();
                }
                else {
                    // Wait a second, fold them again.
                    window.setTimeout(function () {
                        memorize.view.foldCards(memorize.model.unfoldedCards);
                        memorize.model.unlockMove();
                    }, 1000);
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
