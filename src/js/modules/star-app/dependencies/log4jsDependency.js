/**
 * Created by David on 7/06/2014.
 */
/**
* This was added so that all the console.log calls will go into a log file.
*/
define([
    '../module',
    '../services/dependenciesService'
], function(module) {
    module.run(function(dependenciesService) {
        dependenciesService.registerDependency('log4js', log4js = require('log4js'));
        
        // configuring the logging system
        log4js.configure({
            appenders: [
                { type: 'file', filename: 'root.log', maxLogSize: 20480, backups: 0},], // currently, the root.log file is src dir.
            replaceConsole: true
        });
    });
});