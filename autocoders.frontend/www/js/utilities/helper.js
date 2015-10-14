angular.module('starter')
    .service('helper', function () {
        this.makeid = function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            window.localStorage['accountKey'] = text;

            return text;
        }
       

    });