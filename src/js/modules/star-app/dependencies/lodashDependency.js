/**
 * Created by Netanel on 5/25/2014.
 */
define([
    '../module',
    '_',
    '../services/dependenciesService'
], function(module, lodash) {
   module.run(function(dependenciesService) {
       dependenciesService.registerDependency('lodash', lodash);
   });
});