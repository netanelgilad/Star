/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
        tasksService.registerTask({
            name : 'basicAuthenticate',
            description : 'Authenticate to a website using a plain username and password and obtain an authentication cookie.',
            parameters : [
                {
                    name : 'authenticationURL',
                    // TODO: handle questions
                    question : 'To what url would you like to authenticate?'
                },
                {
                    name : 'username',
                    question : 'What is the username to authenticate with?'
                },
                {
                    name : 'password',
                    question : 'What is the password for the username?'
                }
            ],
            dependencies : [
                'http',
                'JQuery'
            ],
            returns : [
                {
                    name : 'authenticationCookie'
                }
            ],
            executeFn : function(authenticationURL, username, password, http, JQuery, environment) {
                var auth_data = 'username=' + username + '&password=' + password;
                var urlInfo = JQuery('<a>').prop('href', authenticationURL);
                var options = {
                    host: urlInfo.prop('hostname'),
                    port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
                    path : urlInfo.prop('pathname'),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': auth_data.length
                    }
                };

                var request = http.request(options, function (response) {
                    environment.return('authenticationCookie', response.headers["set-cookie"][1].split(';')[0]);
                    environment.done();
                });

                request.on('error', function (e) {
                    // TODO: handle errors
                    environment.fail(e);
                });

                // write data to request body
                request.write(auth_data);
                request.end();
            }
        });
    });
});