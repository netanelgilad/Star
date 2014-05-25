/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
       tasksService.registerTask({
           name : 'getHTMLPage',
           description : 'Get a html page as string data.',
           parameters : [
               {
                   name : 'pageURL',
                   question : 'What is URL of the page to get?'
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
               'JQuery'
           ],
           returns : [
               {
                   name : 'htmlString'
               }
           ],
           executeFn : function(pageURL, cookie, referer, http, JQuery, environment) {
               var urlInfo = JQuery('<a>').prop('href', pageURL);

               http.get({
                   host: urlInfo.prop('hostname'),
                   port : (urlInfo.prop('port') === "") ? 80 : urlInfo.prop('port'),
                   path : urlInfo.prop('pathname') + urlInfo.prop('search'),
                   headers : {
                       cookie : cookie,
                       'Referer': referer
                   }
               }, function(response) {
                   var body = '';
                   response.on('data', function(chuck) {
                       body += chuck;
                   });

                   response.on('end', function() {
                       body = body.replace(/<img[^>]*>/g, "");
                       environment.return('htmlString', body);
                       environment.done();
                   });

                   response.on('error', function(e) {
                       environment.fail(e);
                   })
               });
           }
       });
    });
});