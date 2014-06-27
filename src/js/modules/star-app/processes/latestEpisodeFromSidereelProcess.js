/**
 * Created by Netanel on 6/1/2014.
 */
define([
    '../module',
    '../services/processesService'
], function(module) {
    module.run(function(processesService) {
        processesService.registerProcess({
            'name': 'findLatestEpisodeOfATvShowUsingSidereel',
            description : 'Find the latest episode of a tv show using Sidereel.',
            parameters : [
                {
                    name : 'tvShow',
                    question : 'For what TV show?'
                }
            ],
            returns : [
                {
                    name : 'episodeTitle'
                }
            ],
            process : [
                [
                    {
                        type : 'parameters',
                        from : 'tvShow',
                        to : 'searchTerm'
                    }
                ],
                {
                    type : 'process',
                    executeable: 'searchInSidereel'
                },
                [
                    {
                        type : 'connection',
                        from : 'searchResults',
                        to : 'collection'
                    },
                    {
                        type : 'fixed',
                        value : 0,
                        to : 'index'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'getByIndex'
                },
                [
                    {
                        type : 'connection',
                        from : 'element',
                        to : 'object'
                    },
                    {
                        type : 'fixed',
                        value : 'url',
                        to : 'propertyName'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'getProperty'
                },
                [
                    {
                        type : 'fixed',
                        value : 'http://www.sidereel.com',
                        to : 'firstString'
                    },
                    {
                        type : 'connection',
                        from : 'property',
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
                        value : '#episode-selector li .episode-text',
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
                        to : 'false'
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
                                name : 'title',
                                selector : 'div.episode-label a'
                            },
                            {
                                name : 'airDate',
                                selector : 'div.episode-air-date'
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
                        type : 'connection',
                        from : 'objects',
                        to : 'collection'
                    },
                    {
                        type : 'fixed',
                        value : function(item) {
                            return new Date(item["airDate"]) < new Date();
                        },
                        to : 'condition'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'findLast'
                },
                [
                    {
                        type : 'connection',
                        from : 'lastElements',
                        to : 'object'
                    },
                    {
                        type : 'fixed',
                        value : 'title',
                        to : 'propertyName'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'getProperty'
                },
                [
                    {
                        type : 'return',
                        from : 'property',
                        to : 'episodeTitle'
                    }
                ]
            ]
        });
    });
});