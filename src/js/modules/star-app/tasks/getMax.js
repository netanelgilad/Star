/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
        tasksService.registerTask({
            name: 'getMax',
            description : 'Find the maximum value in a collection',
            parameters : [
                {
                    name : "collection",
                    question : "From what collection?"
                },
                {
                    name : "property",
                    question: "From what property to get the values?"
                }
            ],
            dependencies : [
                'lodash'
            ],
            returns : [
                {
                    name : "maxObject"
                }
            ],
            executeFn : function(collection, property, lodash, environment) {
                environment.return('maxObject', lodash.max(collection, property));
                environment.done();
            }
        });
    });
});