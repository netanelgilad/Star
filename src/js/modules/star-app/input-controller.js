/**
 * Created by Netanel on 5/11/2014.
 */
define([
    './module',
    'jquery'
], function (starApp, $) {
    'use strict';

    return starApp.controller('InputController', function($scope, torrentleechService, webScraperService, $q) {
        $scope.obj = {};

        $scope.do = function () {
            torrentleechService.findLatestEpisodeTorrents($scope.searchText.name).then(function (result) {
                $scope.obj.result = result;
            });
        };

        $scope.select2Options =  {
            minimumInputLength: 2,
            query: function (query) {
                var term = query.term.replace(/ /g, '+');
                webScraperService.scrapeGet('http://www.sidereel.com/tv_search?term=' + term)
                    .then(function(data) {
                        data = JSON.parse(data);
                        var result = { results : []};
                        var ids = 0;
                        data.forEach(function (value) {
                            result.results.push({
                                id: query.term + ids++,
                                text: value.label,
                                name : $('<a>').prop('href', value.canonical_url).prop('pathname').substr(1)
                            });
                        });

                        query.callback(result);
                    });
            }
        };

        function promisify(func) {
            return function() {
                var newArguments = Array.prototype.slice.call(arguments, 0);
                var deferred = $q.defer();
                newArguments.push(deferred);
                func.apply(this, newArguments);
                return deferred.promise;
            };
        };

        var x = promisify(function (a, b, deferred) {
            deferred.resolve(a+b);
        });

        x(2,3).then(function(result) { console.log(result)});
    });
});