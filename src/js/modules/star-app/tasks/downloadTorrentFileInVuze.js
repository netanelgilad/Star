/**
 * Created by Netanel on 6/7/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
   module.run(function(tasksService) {
        tasksService.registerTask({
            name: 'downloadTorrentInVuze',
            description : 'Download a torrent using Vuze.',
            parameters : [
                {
                    name : 'torrentFilePath',
                    question : 'What is the path to the torrent file?'
                }
            ],
            adapter : {
                name : 'restAdapter',
                config : {
                    url : 'http://localhost:9080/myapp/torrents',
                    method : 'POST'
                }
            }
        });
   });
});