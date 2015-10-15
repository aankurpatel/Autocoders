angular.module('starter')
    .service('logger', function ($cordovaToast) {
        function toString(obj) {
            var str = '';

            if (typeof (obj) === 'string' || typeof (obj) === 'number') {
                str += obj + "; ";
            } else {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        
                        str += toString(obj[prop] );
                    }
                }
            };
            return str;

        };

        this.log = function (message) {
            var out = toString(message);
           
            console.log(message);
            //alert(JSON.stringify(message));
        };

        this.toast = function(message, time, location) {
            document.addEventListener("deviceready", function () {
                $cordovaToast.show(message, time, location);
            });
            console.log(message);
        }
       

    });