/**
 * Created by Netanel on 5/16/2014.
 */
define([
    './module',
    'jquery',
    './webScraperService'
], function(module, $) {
    module.factory('torrentleechService', function($q, webScraperService) {
        var serviceInstance = {};

        var actionDefinition = {
            name : 'downloadTheLastEpisodeOfAASeries',
            description : "Download the last episode of a given series",
            parameters : [
                {
                    name : "series",
                    question : "For what series?"
                }
            ],
            dependencies : [
                'findLastEpisodeOfASeries',
                'torrentleechAuthenticate',
                'torrentleechFindTorrents',
                'findMaxSeedersTorrent'
            ],
            executeFn : function(findLastEpisodeOfASeries, torrentleechAuthenticate, torrentleechFindTorrents, findMaxSeedersTorrent, series, environment) {
                findLastEpisodeOfASeries.then(function(lastEpisode) {

                });
            }
        };

        serviceInstance.findLatestEpisodeTorrents = function(series) {
            var def = $q.defer();

            series = series.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/ /g,"_");

            var http = require('http');


            // ----------------------------------------

            webScraperService.scrapeGet('http://www.sidereel.com/' + series).then(function(data) {
                data = data.replace(/<img[^>]*>/g,"");
                $(data).find('#episode-selector li:nth-last-child(1) .episode-label a').each(function() {
                    console.log($(this).html());
                    var season = $(this).html().split(" ")[1];
                    var episode = $(this).html().split(" ")[3];
                    getTorrent("S" + (season < 10 ? "0" : "") + season  + "E" + episode).then(function(result) {
                        def.resolve(result);
                    });
                });
            });

            function getTorrent(search) {
                var deferred = $q.defer();

                webScraperService.authenticate('http://www.torrentleech.org/user/account/login/', "natk", "Ngr4evr90%21")
                    .then(function () {
                        series = series.replace(/_/g, "%20");
                        series += "%20";

                        webScraperService.scrapeGet('http://www.torrentleech.org/torrents/browse/index/query/' +
                            series + search).then(function(data) {
                                data = data.replace(/<img[^>]*>/g, "");

                                var result;
                                var mostSeeds = -1;
                                $(data).find('#torrenttable tr').each(function () {
                                    var seeders = parseInt($(this).find('.seeders').html());
                                    if (seeders > mostSeeds) {
                                        result = this;
                                        mostSeeds = seeders;
                                    }
                                });

                                deferred.resolve($(result).find('td.name a').html());
                        });
                    });

                return deferred.promise;
            }

            return def.promise;
        };


        return serviceInstance;
    });
});