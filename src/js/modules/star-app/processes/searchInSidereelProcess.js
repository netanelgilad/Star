/**
 * Created by Netanel on 6/13/2014.
 */
define([
    '../module',
    '../services/processesService'
], function(module) {
    module.run(function(processesService) {
        processesService.registerProcess({
            'name' : 'searchInSidereel',
            'description' : 'Search for a given term in sidereel.',
            'parameters' : [
                {
                    name : 'searchTerm',
                    question : 'What is the term to search for?'
                }
            ],
            'returns' : [
                {
                    name : 'searchResults'
                }
            ],
            'process' : [
                [
                    {
                        type : 'parameters',
                        from : 'searchTerm',
                        to : 'sourceString'
                    },
                    {
                        type : 'fixed',
                        value : ' ',
                        to : 'stringToReplace'
                    },
                    {
                        type : 'fixed',
                        value : '+',
                        to : 'stringToInsert'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'stringReplace'
                },
                [
                    {
                        type : 'fixed',
                        value : 'http://www.sidereel.com/_television/search?utf8=%E2%9C%93&q=',
                        to : 'firstString'
                    },
                    {
                        type : 'connection',
                        from : 'replacedString',
                        to : 'secondString'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'stringConcat'
                },
                [
                    {
                        type : 'connection',
                        from : 'fullString',
                        to : 'pageURL'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'getHTMLPage'
                },
                [
                    {
                        type : 'connection',
                        from : 'htmlString',
                        to : 'HTMLString'
                    },
                    {
                        type : 'fixed',
                        value : 'div.search-results div.showcard-wrapper div.title',
                        to : 'cssSelection'
                    },
                    {
                        type : 'fixed',
                        value : 'all',
                        to : 'selectionOption'
                    },
                    {
                        type : 'fixed',
                        value : true,
                        to : 'inner'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'cssSelect'
                },
                [
                    {
                        type : 'connection',
                        from : 'allSelectedHTML',
                        to : 'HTMLStrings'
                    },
                    {
                        type : 'fixed',
                        value : [
                            {
                                name : 'name',
                                selector : 'a'
                            },
                            {
                                name : 'url',
                                selector : 'a',
                                attribute : 'href'
                            }
                        ],
                        to : 'config'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'htmlsToObjects'
                },
                [
                    {
                        type: 'return',
                        from: 'objects',
                        to: 'searchResults'
                    }
                ]
            ]
        });
    });
});