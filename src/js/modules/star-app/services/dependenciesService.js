/**
 * Created by Netanel on 5/24/2014.
 */
define([
   '../module'
], function(module) {
    return module.service('dependenciesService', function() {
        this.dependencies = {};

        this.registerDependency = function(name, dependency) {
            this.dependencies[name] = dependency;
        };

        this.getDependency = function(name) {
            return this.dependencies[name];
        };
    });
});