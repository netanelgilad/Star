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
            processesService.executeProcess('getTorrentOfLastEpisodeOfATVShow', { tvShow : 'the walking dead' });
        };

        $scope.that = function() {

            var meSpeak = require("mespeak");

//Select english/american voice
            meSpeak.loadVoice(require("mespeak/voices/en/en-us.json"));

//Play a sound
            var data = meSpeak.speak($scope.myText, {rawdata: "mime"});

           // var blob = new Blob(data, {type: "audio/ogg"});
         //   var url = URL.createObjectURL(blob);
        //    audio.src = url;
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', data);
            audioElement.setAttribute('autoplay', 'autoplay');
        };
    });
});