/**
 * Created by Netanel on 5/24/2014.
 */
define([
   '../module',
    './Environment',
    'jquery',
    './tasksService',
    './dependenciesService'
], function(module, Environment) {
    module.service('processesService', function(tasksService, dependenciesService, $q) {
        this.processes = {};

        this.registerProcess = function(process) {
            this.processes[process.name] = process;
        };

        // TODO: user interactions...
        this.executeProcess = function(processName, parameters) {
            var processDef = this.processes[processName];

            var memory = {};
            var lastReturn;
            var finalResult = {};

            var runTask = function(operation) {
                // build the env for the next task
                var currEnv = new Environment($q);
                var nextArgs = {};

                // execute the connectiom
                processDef.process[operation].forEach(function(currMap) {
                    if (currMap.type === 'parameters') {
                        nextArgs[currMap.to] = parameters[currMap.from];
                    }
                    else if (currMap.type === 'connection') {
                        nextArgs[currMap.to] = lastReturn[currMap.from];
                    }
                    else if (currMap.type === 'fixed') {
                        nextArgs[currMap.to] = currMap.value;
                    }
                    else if (currMap.type === 'toMemory') {
                        memory[currMap.to] = lastReturn[currMap.from];
                    }
                    else if (currMap.type === 'fromMemory') {
                        nextArgs[currMap.to] = memory[currMap.from]
                    }
                    else if (currMap.type === 'return') {
                        finalResult[currMap.to] = lastReturn[currMap.from];
                    }
                    else {
                        console.log(currMap.type + ' is unknown.');
                    }
                });

                if (operation + 1 < processDef.process.length) {
                    // get the task
                    var currTaskName = processDef.process[operation + 1];
                    var currTask = tasksService.getTask(currTaskName);

                    if (typeof(currTask) === "undefined") {
                        console.log(currTaskName + " was not found!");
                    }

                    // set the task args
                    var funcArgs = [];

                    if (typeof(currTask.parameters) !== "undefined") {
                        currTask.parameters.forEach(function (param) {
                            funcArgs.push(nextArgs[param.name]);
                        });
                    }

                    // get the dependecies
                    if (typeof(currTask.dependencies) !== "undefined") {
                        currTask.dependencies.forEach(function (dep) {
                            funcArgs.push(dependenciesService.getDependency(dep));
                        });
                    }

                    // add the env
                    funcArgs.push(currEnv);

                    // execute the task
                    currTask.executeFn.apply({}, funcArgs);

                    currEnv.deffered.promise.then(function(result) {
                        console.log(JSON.stringify(result));
                        lastReturn = result;

                        if (operation + 2 < processDef.process.length) {
                            runTask(operation+2);
                        }
                        else {
                            console.log('no end connection!');
                        }
                    }, function(e) {
                        console.log(e)
                    });
                }
                else {
                    console.log(JSON.stringify(finalResult));
                }
            };

            runTask(0);
        };
    });
});