/**
 * Created by Netanel on 6/7/2014.
 */
define([
    '../module'
], function(module) {
   return module.service('adaptersService', function() {
        this._adapters = {};

        this.registerAdapter = function(adapter) {
            this._adapters[adapter.name] = adapter;
        };

       this.getAdapter = function(name) {
           return this._adapters[name];
       };
   });
});