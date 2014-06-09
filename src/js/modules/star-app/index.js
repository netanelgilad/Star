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
    './dependencies/log4jsDependency',
    './dependencies/fsDependency',
    './tasks/basicAuthentication',
    './tasks/capitalizeWords',
    './tasks/cssSelect',
    './tasks/getHTMLPage',
    './tasks/getMax',
    './tasks/htmlsToObjects',
    './tasks/stringConcat',
    './tasks/stringReplace',
    './tasks/getProperty',
    './tasks/downloadFile',
    './tasks/downloadTorrentFileInVuze',
    './processes/torrentleechProcess',
    './processes/latestEpisodeFromSidereelProcess',
    './adapters/restAdapter'
], function () {});