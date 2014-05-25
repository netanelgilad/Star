/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/dependenciesService'
], function(module) {
    module.run(function(dependenciesService) {
        dependenciesService.registerDependency('http', require('http'));
    });
});