define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var radioButtonsGroup = require("sugar-web/graphics/radiobuttonsgroup");

    var model = require("activity/model");
    var view = require("activity/view");
    var controller = require("activity/controller");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        // Example game.
        var cardsSet = [
            {question: '1+1', answer: '2'},
            {question: '3+0', answer: '3'},
            {question: '2+2', answer: '4'},
            {question: '3+2', answer: '5'},
            {question: '2+4', answer: '6'},
            {question: '5+2', answer: '7'},
            {question: '7+1', answer: '8'},
            {question: '5+4', answer: '9'},
            {question: '2+8', answer: '10'},
            {question: '10+1', answer: '11'},
            {question: '7+5', answer: '12'},
            {question: '4+9', answer: '13'},
            {question: '11+3', answer: '14'},
            {question: '6+9', answer: '15'},
            {question: '10+6', answer: '16'},
            {question: '5+12', answer: '17'},
            {question: '9+9', answer: '18'},
            {question: '6+13', answer: '19'}
        ];

        function Memorize() {
            this.model = new model.Model();
            this.view = new view.View();
            this.controller = new controller.Controller(this.model, this.view);
        }

        memorize = new Memorize();
        memorize.model.loadGame(cardsSet);
        memorize.view.createView(4);
        memorize.controller.update();

        var fourButton = document.getElementById("four-button");
        fourButton.onclick = function () {
            memorize.model.createGame(4);
            memorize.view.createView(4);
            memorize.controller.update();
        };

        var fiveButton = document.getElementById("five-button");
        fiveButton.onclick = function () {
            memorize.model.createGame(5);
            memorize.view.createView(5);
            memorize.controller.update();
        };

        var sixButton = document.getElementById("six-button");
        sixButton.onclick = function () {
            memorize.model.createGame(6);
            memorize.view.createView(6);
            memorize.controller.update();
        };

        var sizeRadio = new radioButtonsGroup.RadioButtonsGroup(
        [fourButton, fiveButton, sixButton]);

        var restartButton = document.getElementById("restart-button");
        restartButton.onclick = function () {
            memorize.model.createGame();
            memorize.view.createView(memorize.model.size);
            memorize.controller.update();
        };

    });

});
