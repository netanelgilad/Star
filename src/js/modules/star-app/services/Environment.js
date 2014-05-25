/**
 * Created by Netanel on 5/24/2014.
 */
define([

], function() {
    var Environment = function ($q) {
        this.deffered = $q.defer();
        this.returnParts = {};
    };

    Environment.prototype.return = function(name, value) {
        this.returnParts[name] = value;
    };

    Environment.prototype.done = function() {
        this.deffered.resolve(this.returnParts);
    };

    Environment.prototype.fail = function(error) {
        this.deffered.reject();
        // TODO: add fails..
    };

    return Environment;
});