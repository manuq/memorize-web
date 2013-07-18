define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var palettemenu = require("sugar-web/graphics/palettemenu");
    var mustache = require("mustache");

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
        memorize.controller.newGame(4);

        var menuData = [
            {label: "4 X 4", id: "four-button", icon: true},
            {label: "5 X 5", id: "five-button", icon: true},
            {label: "6 X 6", id: "six-button", icon: true}
        ];

        var sizeButton = document.getElementById("size-button");
        var sizePalette = new palettemenu.PaletteMenu(sizeButton, "Change size",
                                                      menuData);

        var changePaletteIcon = function (button) {
            var span = button.querySelector('span');
            var style = span.currentStyle || window.getComputedStyle(span, '');
            sizeButton.style.backgroundImage = style.backgroundImage;
            var invoker = sizePalette.getPalette().querySelector('.palette-invoker');
            invoker.style.backgroundImage = style.backgroundImage;
        };

        var fourButton = document.getElementById("four-button");
        fourButton.onclick = function () {
            memorize.controller.newGame(4);
            changePaletteIcon(this);
        };

        var fiveButton = document.getElementById("five-button");
        fiveButton.onclick = function () {
            memorize.controller.newGame(5);
            changePaletteIcon(this);
        };

        var sixButton = document.getElementById("six-button");
        sixButton.onclick = function () {
            memorize.controller.newGame(6);
            changePaletteIcon(this);
        };

        var restartButton = document.getElementById("restart-button");
        restartButton.onclick = function () {
            memorize.controller.newGame();
        };
    });
});
