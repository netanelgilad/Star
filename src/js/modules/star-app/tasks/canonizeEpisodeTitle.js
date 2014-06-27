/**
 * Created by Netanel on 6/14/2014.
 */
define([
    '../module',
    '../services/tasksService'
], function(module) {
    module.run(function (tasksService) {
        tasksService.registerTask({
            name : 'canonizeEpisodeTitle',
            description : 'Canonize an episode title into the format expected in downloads.',
            parameters : [
                {
                    name : 'episodeTitle',
                    question : 'What is the title of the episode?'
                },
            ],
            returns : [
                {
                    name : 'canonizedEpisodeTitle'
                }
            ],
            executeFn: function (episodeTitle, environment) {
                var parts = episodeTitle.split(' ');
                var season = parts[1];
                var episode = parts [3];

                var result = 'S';
                if (season < 10){
                    result += '0';
                }
                result += season + 'E';
                if (episode < 10) {
                    result += '0';
                }
                result += episode;

                environment.return('canonizedEpisodeTitle', result);
                environment.done();
            }
        });
    });
});