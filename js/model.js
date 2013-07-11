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
        this.status = "selecting question";
        this.selectedQuestion = undefined;
        this.selectedAnswer = undefined;
        this.unfoldedCards = undefined;
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
    };

    // Return the card content and update the game state.
    model.Model.prototype.selectCard = function (cardPosition) {
        var cardContent = this.inGameCards[cardPosition];

        if (this.status == "selecting question") {
            this.selectedQuestion = this.inGameCards[cardPosition];
            this.unfoldedCards = [cardPosition];
            this.status = "selecting answer";
            return {'cardContent': cardContent, 'end': false};
        }
        else {
            if (this.status == "selecting answer") {
                this.selectedAnswer = this.inGameCards[cardPosition];
                this.unfoldedCards.push(cardPosition);
                this.status = "selecting none";
                return {'cardContent': cardContent, 'end': true};
            }
        }
    };

    // Return true if the unfolded cards match.
    model.Model.prototype.checkMatches = function () {
        for (var i = 0; i < this.cardsSet.length; i++) {
            if (this.cardsSet[i].question == this.selectedQuestion) {
                return (this.cardsSet[i].answer == this.selectedAnswer);
            }
        }
    };

    return model;

});
