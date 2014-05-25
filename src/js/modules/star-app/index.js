/**
 * Attach all module components
 **/
define([
    './input-controller',
    './services/tasksService',
    './services/processesService',
    './services/dependenciesService',
    './dependencies/httpDependency',
    './dependencies/jqueryDependency',
    './dependencies/lodashDependency',
    './tasks/basicAuthentication',
    './tasks/capitalizeWords',
    './tasks/cssSelect',
    './tasks/getHTMLPage',
    './tasks/getMax',
    './tasks/htmlsToObjects',
    './tasks/stringConcat',
    './tasks/stringReplace',
    './processes/torrentleechProcess'
], function () {});