/**
 * Created by Netanel on 6/14/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function (tasksService) {
        tasksService.registerTask({
            name : 'findLast',
            description : 'Get the last element(s) of a collection by a certain condition.',
            parameters : [
                {
                    name : 'collection',
                    question : 'What is the collection to get the last element(s) from?'
                },
                {
                    // Find a better way to support condition or predicates
                    name : 'condition',
                    question : 'What is the condition to use?'
                }
            ],
            dependencies : [
                'lodash'
            ],
            returns : [
                {
                    name : 'lastElements'
                }
            ],
            executeFn : function(collection, condition, lodash, environment) {
                environment.return('lastElements', lodash.findLast(collection, condition));
                environment.done();
            }
        });
    });
});