/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
        tasksService.registerTask({
            name : 'capitalizeWords',
            description : 'Capitalize all the words in a given string.',
            parameters : [
                {
                    name : 'stringToCapitalize',
                    question : 'What would you like to capitalize?'
                }
            ],
            return : [
                {
                    name : 'capitalizedString'
                }
            ],
            executeFn : function(stringToCapitalize, environment) {
                environment.return('capitalizedString', stringToCapitalize.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }));
                environment.done();
            }
        });
    });
});