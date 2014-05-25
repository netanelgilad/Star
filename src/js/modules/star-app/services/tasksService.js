/**
 * Created by Netanel on 5/24/2014.
 */
define([
    './../module'
], function(module) {
    module.service('tasksService', function() {
        this.tasks = {};
        this.registerTask = function (taskDefinition) {
            this.tasks[taskDefinition.name] = taskDefinition;
        };

        this.getTask = function (taskName) {
            return this.tasks[taskName];
        }
    });
});