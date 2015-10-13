angular.module('starter')
    .service('pushNotificationProxy', function ($http, logger) {
        var self = this;
        var app_id = "api-project-405931835723";
        var private_key = " AIzaSyDhO1kckiYgD7ZoygDwradomZbJzkTzx14";

        self.subscribe = function (user) {
            if (!user.token) {
                throw new Error("user.token is missing.");
            }
            if (!user.accountKey) {
                throw new Error("user.accountKey is missing");
            }

            // send subscription to api

            alert('subscription added for ' + user);
        };

        self.unsubscribe = function(user) {
            if (!user.token) {
                throw new Error("user.token is missing.");
            }

            // send request to api

        };

       
        self.sendNotification = function(message, token) {
            console.log('sending notification to ' + token);
            // get all tokens for the given accountKey
            var post_data = {
                "tokens": [
                    token
                ],
                "notification": {
                    "alert": message,
                    "ios": {
                        "badge": 1,
                        "sound": "ping.aiff",
                        "expiry": 1423238641,
                        "priority": 10,
                        "contentAvailable": true,
                        "payload": {
                            "key1": "value",
                            "key2": "value"
                        }
                    },
                    "android": {
                        "collapseKey": "foo",
                        "delayWhileIdle": true,
                        "timeToLive": 300,
                        "payload": {
                            "key1": "value",
                            "key2": "value"
                        }
                    }
                }
            }
           
           
//            url = "https://push.ionic.io/api/v1/push"
//            req = urllib2.Request(url, data = post_data)
//            req.add_header("Content-Type", "application/json");
//            req.add_header("X-Ionic-Application-Id", app_id);
//            b64 = base64.encodestring('%s:' % private_key).replace('\n', '');
//            req.add_header("Authorization", "Basic %s" % b64);
//            resp = urllib2.urlopen(req);

//            var req = {
//                url: "https://push.ionic.io/api/v1/push ",
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'X-Ionic-Application-Id': app_id
//                },
//                data: post_data
//            };
            var req = {
                url: "https://gcm-http.googleapis.com/gcm/send",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=' + private_key
                },
                data: {
                    //                    'to': token,
                    'registration_ids': token,
                    data: {
                        message: 'hello GP'
                    }
                }
            };

            $http(req).then(function(response) {
                logger.log(response);
            }, function (error) {
                logger.log(error);
            });

        };
    });