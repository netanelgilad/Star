/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
        tasksService.registerTask({
            name : 'stringConcat',
            description : 'Concat 2 strings into one string.',
            parameters : [
                {
                    name : 'firstString',
                    question : 'What is the first string?'
                },
                {
                    name : 'secondString',
                    question : 'What is the second string?'
                }
            ],
            returns : [
                {
                    name : 'fullString'
                }
            ],
            executeFn : function(firstString, secondString, environment) {
                environment.return('fullString', firstString + secondString);
                environment.done();
            }
        });
    });
});