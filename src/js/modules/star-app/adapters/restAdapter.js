/**
 * Created by Netanel on 6/7/2014.
 */
define([
    '../module',
    'jquery',
    '../services/adaptersService'
], function(module, $) {
    module.run(function(adaptersService) {
       adaptersService.registerAdapter({
          name : 'restAdapter',
          description: 'Run tasks using REST api.',
          runTask : function(taskConfig, environment) {
              var http = require('http');

              var urlInfo = $('<a>').prop('href', taskConfig.url);

              // TODO: deal with methods better
              if (taskConfig.method === 'GET') {
                  // TODO: add sending data
                  http.get({
                      host: urlInfo.prop('hostname'),
                      port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
                      path : urlInfo.prop('pathname') + urlInfo.prop('search')
                  }, function(response) {
                      var body = '';
                      response.on('data', function(chuck) {
                          body += chuck;
                      });

                      response.on('end', function() {
                          if (typeof taskConfig.returns !== 'undefined') {
                              var result = JSON.parse(body);

                              for (var returnValue in result) {
                                  environment.return(returnValue, result[returnValue]);
                              }
                          }

                          environment.done();
                      });

                      response.on('error', function(e) {
                          environment.fail(e);
                      })
                  });
              }
              else if (taskConfig.method === 'POST') {
                  var data = JSON.stringify(taskConfig.parameters);
                  var urlInfo = $('<a>').prop('href', taskConfig.url);
                  var options = {
                      host: urlInfo.prop('hostname'),
                      port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
                      path : urlInfo.prop('pathname'),
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Content-Length': data.length
                      }
                  };

                  var request = http.request(options, function (response) {
                      var body = '';
                      response.on('data', function(chuck) {
                          body += chuck;
                      });

                      response.on('end', function() {
                          if (typeof taskConfig.returns !== 'undefined') {
                              var result = JSON.parse(body);

                              for (var returnValue in result) {
                                  environment.return(returnValue, result[returnValue]);
                              }
                          }

                          environment.done();
                      });

                      response.on('error', function(e) {
                          environment.fail(e);
                      });
                  });

                  request.on('error', function (e) {
                      // TODO: handle errors
                      environment.fail(e);
                  });

                  // write data to request body
                  request.write(data);
                  request.end();
              }
              else {
                  // TODO: handle bad methods
                  console.log('unknown method: ' + taskConfig.method);
              }
          }
       });
    });
});