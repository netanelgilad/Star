/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/processesService'
], function(module) {
    module.run(function(processesService) {
        processesService.registerProcess({
            name: 'getTorrentOfLastEpisodeOfATVShow',
            description : 'Find the torrent with the max seeders of a last episode of a series.',
            parameters : [
                {
                    name : 'tvShow',
                    question : 'For what TV show?'
                }
            ],
            returns : [
                {
                    name : 'torrentName'
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
                'capitalizeWords',
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
                'stringReplace',
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
                'stringConcat',
                [
                    {
                        type : 'connection',
                        from : 'fullString',
                        to : 'pageURL'
                    }
                ],
                'getHTMLPage',
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
                'cssSelect',
                [
                    {
                        type: 'connection',
                        from : 'selectedHTML',
                        to : 'sourceString'
                    },
                    {
                        type : 'fixed',
                        value : 'Season ',
                        to : 'stringToReplace'
                    },
                    {
                        type : 'fixed',
                        value : 'S0',
                        to : 'stringToInsert'
                    }
                ],
                'stringReplace',
                [
                    {
                        type : 'connection',
                        from : 'replacedString',
                        to : 'sourceString'
                    },
                    {
                        type: 'fixed',
                        value : ' Episode ',
                        to : 'stringToReplace'
                    },
                    {
                        type : 'fixed',
                        value : 'E',
                        to : 'stringToInsert'
                    }
                ],
                'stringReplace',
                [
                    {
                        type : 'toMemory',
                        from : 'replacedString',
                        to : 'fullEpisodeString'
                    },
                    {
                        type : 'fixed',
                        value : 'http://www.torrentleech.org/user/account/login/',
                        to : 'authenticationURL'
                    },
                    {
                        type : 'fixed',
                        value : 'natk',
                        to : 'username'
                    },
                    {
                        type : 'fixed',
                        value : 'Ngr4evr90%21',
                        to: 'password'
                    }
                ],
                'basicAuthenticate',
                [
                    {
                        type : 'toMemory',
                        from : 'authenticationCookie',
                        to : 'torrentleechAuthCookie'
                    },
                    {
                        type : 'parameters',
                        from : 'tvShow',
                        to : 'sourceString'
                    },
                    {
                        type : 'fixed',
                        value : ' ',
                        to : 'stringToReplace'
                    },
                    {
                        type : 'fixed',
                        value : '%20',
                        to : 'stringToInsert'
                    }
                ],
                'stringReplace',
                [
                    {
                        type : 'connection',
                        from : 'replacedString',
                        to : 'firstString'
                    },
                    {
                        type : 'fixed',
                        value : '%20',
                        to : 'secondString'
                    }
                ],
                'stringConcat',
                [
                    {
                        type : 'connection',
                        from : 'fullString',
                        to : 'firstString'
                    },
                    {
                        type : 'fromMemory',
                        from : 'fullEpisodeString',
                        to : 'secondString'
                    }
                ],
                'stringConcat',
                [
                    {
                        type : 'fixed',
                        value : 'http://www.torrentleech.org/torrents/browse/index/query/',
                        to : 'firstString'
                    },
                    {
                        type : 'connection',
                        from : 'fullString',
                        to : 'secondString'
                    }
                ],
                'stringConcat',
                [
                    {
                        type : 'connection',
                        from : 'fullString',
                        to : 'pageURL'
                    },
                    {
                        type : 'fromMemory',
                        from : 'torrentleechAuthCookie',
                        to : 'cookie'
                    },
                    {
                        type : 'fixed',
                        value : 'http://www.torrentleech.org/torrents/browse',
                        to : 'referer'
                    }
                ],
                'getHTMLPage',
                [
                    {
                        type : 'connection',
                        from : 'htmlString',
                        to : 'HTMLString'
                    },
                    {
                        type : 'fixed',
                        value : '#torrenttable tr',
                        to : 'cssSelection'
                    },
                    {
                        type : 'fixed',
                        value : 'all',
                        to : 'selectionOption'
                    },
                    {
                        type : 'fixed',
                        value : false,
                        to : 'inner'
                    }
                ],
                'cssSelect',
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
                                selector : 'td.name a'
                            },
                            {
                                name : 'seeders',
                                selector : '.seeders'
                            }
                        ],
                        to : 'config'
                    }
                ],
                'htmlsToObjects',
                [
                    {
                        type : 'connection',
                        from : 'objects',
                        to : 'collection'
                    },
                    {
                        type : 'fixed',
                        value : 'seeders',
                        to : 'property'
                    }
                ],
                'getMax',
                [
                    {
                        type : 'return',
                        from : 'maxObject',
                        to : 'torrentName'
                    }
                ]
            ]
        });
    });
});