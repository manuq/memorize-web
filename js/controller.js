define(function (require) {

    var controller = {};

    controller.Controller = function (model, view) {
        this.model = model;
        this.view = view;
    };

    return controller;

});
