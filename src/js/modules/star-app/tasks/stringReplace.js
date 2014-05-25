/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
        tasksService.registerTask({
            name : 'stringReplace',
            description : 'Replace every occurence of string in a string with another string',
            parameters : [
                {
                    name : 'sourceString',
                    question : 'What is the string to replace in?'
                },
                {
                    name : 'stringToReplace',
                    question : 'What is the string to replace?'
                },
                {
                    name : 'stringToInsert',
                    question : 'What is the string to insert instead?'
                }
            ],
            returns : [
                {
                    name : 'replacedString'
                }
            ],
            executeFn : function(sourceString, stringToReplace, stringToInsert, environment) {
                environment.return('replacedString',sourceString.replace(new RegExp(stringToReplace, 'g'), stringToInsert));
                environment.done();
            }
        });
    });
});