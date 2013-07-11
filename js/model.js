define(function (require) {

    var model = {};

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

    model.Model = function (cardsSet) {
        this.cardsSet = cardsSet;
        this.inGameCards = undefined;
        this.createGame();
    };

    // Initialize gameCards, the set of cards shuffled and grouped in
    // two suits: questions and answers.
    model.Model.prototype.createGame = function () {
        var questions = [];
        var answers = [];
        for (var i = 0; i < this.cardsSet.length; i ++) {
            questions.push(this.cardsSet[i].question);
            answers.push(this.cardsSet[i].answer);
        }

        this.inGameCards = shuffle(questions).concat(shuffle(answers));
        console.log(this.inGameCards);
    };

    return model;

});
