/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
requirejs.config({

    paths: {
        'domReady': '../lib/requirejs-domready/domReady',
        'angular': '../lib/angular/angular',
        'select2': '../lib/select2/select2',
        'angular-ui-select2': '../lib/angular-ui-select2/src/select2',
        'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
        'handlebars': '../lib/handlebars/handlebars',
        'text': '../lib/requirejs-text/text',
        '_': '../lib/lodash/dist/lodash',
        'jquery': '../lib/jquery/jquery',
        'angular-bootstrap':'../lib/angular-bootstrap/ui-bootstrap',
        'angular-bootstrap-tmpls': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'elasticsearch' : '../lib/elasticsearch/elasticsearch.angular'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular':{
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-ui-router':{
            deps:['angular']
        },
        'angular-ui-select2':{
            deps:['angular', 'select2']
        },
        'handlebars':{
            exports:'Handlebars'
        },
        '_':{
            exports:'_'
        },
        'angular-bootstrap-tmpls':{
            deps: ['angular']
        },
        'angular-bootstrap':{
            deps:['angular', 'jquery', 'angular-bootstrap-tmpls']
        },
        'elasticsearch' : ['angular']
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});
