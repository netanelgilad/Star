/**
 * Created by Netanel on 5/11/2014.
 */
define([
    './module',
    'jquery',
    './services/processesService'
], function (starApp, $) {
    'use strict';

    return starApp.controller('InputController', function($scope, processesService) {
        $scope.obj = {};

        $scope.do = function () {
            processesService.executeProcess('downloadTorrentOfLastEpisodeOfATVShow', { tvShow : $scope.myText });
        };

        $scope.create = function() {
            processesService.addProcess();
        }
    });
});