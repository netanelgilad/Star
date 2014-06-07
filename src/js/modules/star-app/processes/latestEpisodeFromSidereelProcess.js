/**
 * Created by Netanel on 6/1/2014.
 */
define([
    '../module',
    '../services/processesService'
], function(module) {
    module.run(function(processesService) {
        processesService.registerProcess({
            name: 'findLatestEpisodeOfATvShowUsingSidereel',
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
                        to : 'stringToCapitalize'
                    }
                ],
                {
                    type : 'task',
                    executeable: 'capitalizeWords'
                },
                [
                    {
                        type : 'connection',
                        from : 'capitalizedString',
                        to : 'sourceString'
                    },
                    {
                        type : 'fixed',
                        value : ' ',
                        to : 'stringToReplace'
                    },
                    {
                        type : 'fixed',
                        value : '_',
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
                        value : 'http://www.sidereel.com/',
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
                        value : '#episode-selector li:nth-last-child(1) .episode-label a',
                        to : 'cssSelection'
                    },
                    {
                        type : 'fixed',
                        value : 'first',
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
                        type : 'return',
                        from : 'selectedHTML',
                        to : 'episodeTitle'
                    }
                ]
            ]
        });
    });
});