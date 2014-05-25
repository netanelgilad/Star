/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
        tasksService.registerTask({
            name : 'htmlsToObjects',
            description : 'Take an array of  html strings and make the data in it into an array of objects.',
            parameters : [
                {
                    name : 'HTMLStrings',
                    question : 'What are the html strings to work on?'
                },
                {
                    // TODO : how to describe objects
                    name : 'config',
                    question : 'What is the configuration for the object to build?'
                }
            ],
            dependencies : [
                'JQuery'
            ],
            returns : [
                {
                    name : 'objects'
                }
            ],
            executeFn : function(HTMLStrings, config, JQuery, environment) {
                var objects = [];

                HTMLStrings.forEach(function(htmlString) {
                    var returnObj = {};

                    config.forEach(function(prop) {
                        returnObj[prop.name] = JQuery(htmlString).find(prop.selector).first().html();
                    });

                    objects.push(returnObj);
                });

                environment.return('objects', objects);
                environment.done();
            }
        });
    });
});