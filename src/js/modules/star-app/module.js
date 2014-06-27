/**
 * Created by Netanel on 5/10/2014.
 */
/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-ui-select2',
    'elasticsearch'
], function (ng) {
    'use strict';

    return ng.module('starApp', ['ui.select2', 'elasticsearch']);
});