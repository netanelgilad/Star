/**
 * Created by Netanel on 5/24/2014.
 */
define([
    '../module',
    '../services/processesService'
], function(module) {
    module.run(function(processesService) {
        processesService.registerProcess({
            'name' : 'downloadTorrentOfLastEpisodeOfATVShow',
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
                        to : 'tvShow'
                    }
                ],
                {
                    type : 'process',
                    executeable : 'findLatestEpisodeOfATvShowUsingSidereel'
                },
                [
                    {
                        type: 'connection',
                        from : 'episodeTitle',
                        to : 'episodeTitle'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'canonizeEpisodeTitle'
                },
                [
                    {
                        type : 'toMemory',
                        from : 'canonizedEpisodeTitle',
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
                {
                    type : 'task',
                    executeable : 'basicAuthenticate'
                },
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
                {
                    type : 'task',
                    executeable : 'stringReplace'
                },
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
                {
                    type : 'task',
                    executeable : 'stringConcat'
                },
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
                {
                    type : 'task',
                    executeable : 'stringConcat'
                },
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
                {
                    type : 'task',
                    executeable : 'stringConcat'
                },
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
                                selector : 'td.name a'
                            },
                            {
                                name : 'seeders',
                                selector : '.seeders',
                                type : 'number'
                            },
                            {
                                name : 'url',
                                selector : 'td.quickdownload a',
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
                {
                    type : 'task',
                    executeable : 'getMax'
                },
                [
                    {
                        type : 'connection',
                        from : 'maxObject',
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
                        value : 'http://torrentleech.org',
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
                        type : 'toMemory',
                        from : 'fullString',
                        to : 'torrentDownloadURL'
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
                {
                    type : 'task',
                    executeable : 'basicAuthenticate'
                },
                [
                    {
                        type : 'fromMemory',
                        from : 'torrentDownloadURL',
                        to : 'fileURL'
                    },
                    {
                        type : 'fixed',
                        value : 'C:\\temp\\tempTorrent.torrent',
                        to : 'targetFilePath'
                    },
                    {
                        type : 'connection',
                        from : 'authenticationCookie',
                        to : 'cookie'
                    },
                    {
                        type : 'fixed',
                        value : 'http://www.torrentleech.org/torrents/browse',
                        to : 'referer'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'downloadFile'
                },
                [
                    {
                        type : 'fixed',
                        value : 'C:\\temp\\tempTorrent.torrent',
                        to : 'torrentFilePath'
                    }
                ],
                {
                    type : 'task',
                    executeable : 'downloadTorrentInVuze'
                },
                [

                ]
            ]
        });
    });
});