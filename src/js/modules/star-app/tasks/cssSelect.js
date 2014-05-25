/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
       tasksService.registerTask({
           name : 'cssSelect',
           description : 'Select a part of an html string',
           parameters : [
               {
                   name : 'HTMLString',
                   question : 'What is the html string to look in?'
               },
               {
                   name : 'cssSelection',
                   question : 'What is the css selector to use?'
               },
               {
                   // TODO: handle enums
                   name : 'selectionOption',
                   question : 'Would you like so get all occurrences or just the first?'
               },
               {
                   name : 'inner',
                   question : 'Would you like to get inner html of the selection?'
               }
           ],
           dependencies : [
               'JQuery'
           ],
           returns : [
               {
                   name : 'selectedHTML'
               },
               {
                   name : 'allSelectedHTML'
               }
           ],
           executeFn : function(HTMLString, cssSelection, selectionOption, inner, JQuery, environment) {
               if (selectionOption === 'first') {
                   var result;
                   if (inner) {
                       result = JQuery(HTMLString).find(cssSelection).first().html()
                   }
                   else {
                       result = JQuery(HTMLString).find(cssSelection).first().wrap('<p>').parent().html();
                   }
                   environment.return('selectedHTML', result);
               }
               else if (selectionOption === 'all') {
                   var htmls = [];
                   JQuery(HTMLString).find(cssSelection).each(function() {
                       var result;
                       if (inner) {
                           result = JQuery(this).html()
                       }
                       else {
                           result = JQuery(this).wrap('<p>').parent().html();
                       }

                       htmls.push(result);
                   });
                   environment.return('allSelectedHTML', htmls);
               }
               environment.done();
           }
       });
    });
});