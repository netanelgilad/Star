/**
 * Created by Netanel on 5/16/2014.
 */
define([
    './module',
    'jquery'
], function(module, $) {
   module.factory('webScraperService', function($q) {
       var serviceInstance = {
            authCookie : undefined
       };

       var http = require('http');



       serviceInstance.authenticate = function(url, username, password) {
           var deferred = $q.defer();

           var auth_data = 'username=' + username + '&password=' + password;
           var urlInfo = $('<a>').prop('href', url);
           var options = {
               host: urlInfo.prop('hostname'),
               port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
               path : urlInfo.prop('pathname'),
               method: 'POST',
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Content-Length': auth_data.length
               }
           };

           var request = http.request(options, function (response) {
               serviceInstance.authCookie = response.headers["set-cookie"][1].split(';')[0];
               deferred.resolve();
           });

           request.on('error', function (e) {
               deferred.reject(e);
           });

           // write data to request body
           request.write(auth_data);
           request.end();

           return deferred.promise;
       };

       serviceInstance.scrapeGet = function(url) {
           var deferred = $q.defer();

           var urlInfo = $('<a>').prop('href', url);

           http.get({
               host: urlInfo.prop('hostname'),
               port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
               path : urlInfo.prop('pathname') + urlInfo.prop('search'),
               headers : {
                   cookie : serviceInstance.authCookie,
                   'Referer': 'http://www.torrentleech.org/torrents/browse'
               }
           }, function(response) {
               var body = '';
               response.on('data', function(chuck) {
                   body += chuck;
               });

               response.on('end', function() {
                   deferred.resolve(body);
               });

               response.on('error', function(e) {
                   deferred.reject(e);
               })
           });

           return deferred.promise;
       };

       return serviceInstance;
   });
});