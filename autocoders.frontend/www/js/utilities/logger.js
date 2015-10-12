angular.module('starter')
    .service('logger', function () {
        function toString(obj) {
            var str = '';

            if (typeof (obj) === 'string' || typeof (obj) === 'number') {
                str += obj;
            } else {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        
                        str += toString(obj[prop] ) + '\n';
                    }
                }
            };
            return str;

        };

        this.log = function (message) {
            //var out = toString(message);
           
            console.log(message);
           // alert(out);
        };

       

    });