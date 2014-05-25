/**
 * Created by Netanel on 5/24/2014.
 */
define([
   '../module',
   'jquery',
   '../services/dependenciesService'
], function(module, JQuery) {
    module.run(function(dependenciesService) {
        dependenciesService.registerDependency('JQuery', JQuery);
    });
});