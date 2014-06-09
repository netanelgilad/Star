/**
 * Created by Netanel on 6/8/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
   module.run(function(tasksService) {
      tasksService.registerTask({
         name : 'downloadFile',
         description : 'Download a file from the web to the filesystem.',
         parameters : [
             {
                 name : 'fileURL',
                 question : 'What is the url of the file to download?'
             },
             {
                 // TODO : find a better way to handle files
                 name : 'targetFilePath',
                 question : 'Where should the file be downloaded to?'
             },
             {
                 name : 'cookie',
                 optional : true
             },
             {
                 name : 'referer',
                 optional : true
             }
         ],
         dependencies : [
             'http',
             'fs',
             'JQuery'
         ],
         executeFn : function(fileURL, targetFilePath, cookie, referer, http, fs, JQuery, environment) {
             var urlInfo = JQuery('<a>').prop('href', fileURL);

             var file = fs.createWriteStream(targetFilePath);
             http.get({
                 host: urlInfo.prop('hostname'),
                 port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
                 path : urlInfo.prop('pathname') + urlInfo.prop('search'),
                 headers : {
                     cookie : cookie,
                     'Referer': referer
                 }
             }, function(response) {
                 response.pipe(file);
                 file.on('finish', function() {
                     file.close(function() {
                         environment.done();
                     });
                 });
             }).on('error', function(err) { // Handle errors
                 fs.unlink(targetFilePath); // Delete the file async. (But we don't check the result)
                 environment.fail(err);
             });
         }
      });
   });
});