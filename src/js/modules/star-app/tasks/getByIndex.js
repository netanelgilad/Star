/**
 * Created by Netanel on 6/13/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function (tasksService) {
        tasksService.registerTask({
            name : 'getByIndex',
            description : 'Get an element from a collection by a given index.',
            parameters : [
                {
                    name : 'collection',
                    question : 'What is the collection to get from?'
                },
                {
                    name : 'index',
                    question : 'What is the index of the elemnt'
                }
            ],
            returns : [
                {
                    name : 'element'
                }
            ],
            executeFn : function(collection, index, environment) {
                environment.return('element', collection[index]);
                environment.done();
            }
        });
    });
});