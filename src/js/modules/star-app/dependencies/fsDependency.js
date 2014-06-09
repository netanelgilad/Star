/**
 * Created by Netanel on 6/8/2014.
 */
define([
    '../module',
    '../services/dependenciesService'
], function(module) {
    module.run(function(dependenciesService) {
        dependenciesService.registerDependency('fs', require('fs'));
    });
});