/**
 * Created by Netanel on 6/8/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function(tasksService) {
       tasksService.registerTask({
          name : 'getProperty',
          description : 'Get a property from an object.',
          parameters : [
              {
                  name : 'object',
                  question : 'What is the object to get the property from?'
              },
              {
                  name : 'propertyName',
                  question : 'What is the property to get from the object?'
              }
          ],
          returns : [
              {
                  name : 'property'
              }
          ],
          executeFn : function(object, propertyName, environment) {
            environment.return('property', object[propertyName]);
            environment.done();
          }
       });
    });
});