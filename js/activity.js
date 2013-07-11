define(function (require) {
    var activity = require("sugar-web/activity/activity");

    var model = require("activity/model");
    var view = require("activity/view");
    var controller = require("activity/controller");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

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
        memorize.controller.update();

    });

});
