/**
 * Created by Netanel on 6/21/2014.
 */
define([
    './../module'
], function(module) {
    module.service('searchService', function (esFactory) {
        return esFactory({
            host : 'localhost:9200'
        });
    });
});