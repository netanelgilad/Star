/**
 * Created by Netanel on 5/24/2014.
 */
define([
   '../module',
    './Environment',
    'jquery',
    './tasksService',
    './dependenciesService',
    './adaptersService',
    './searchService'
], function(module, Environment) {
    module.service('processesService', function(tasksService, dependenciesService, adaptersService, $q, searchService) {
        this.processes = {};

        this.registerProcess = function(process) {
            searchService.update({
                index : 'star',
                type : 'process',
                id : process.name,
                body : {
                    doc : process,
                    doc_as_upsert : true
                }
            }, function(error, response) {
                console.log(response.error);
            });
            this.processes[process.name] = process;
        };

        this._runTask = function(taskName, nextArgs) {
            var currEnv = new Environment($q);

            // get the task
            var currTask = tasksService.getTask(taskName);

            if (typeof(currTask) === "undefined") {
                console.log(taskName + " was not found!");
                currEnv.deffered.reject(taskName + " was not found!");
            }
            else {
                if (typeof currTask.adapter !== 'undefined') {
                    var adapter = adaptersService.getAdapter(currTask.adapter.name);
                    // TODO: deal with adapter not found

                    var taskConfig = currTask.adapter.config;
                    // TODO: handle adapter task params better?
                    taskConfig.parameters = nextArgs;
                    taskConfig.returns = currTask.returns;

                    adapter.runTask(taskConfig, currEnv);
                }
                else {
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
                }
            }

            return currEnv.deffered.promise;
        };

        // TODO: user interactions...
        this.executeProcess = function(processName, parameters , memory) {
            // TODO: deal with no process found
            var processDef = this.processes[processName];
            var self = this;

            var deferred = $q.defer();

            var memory = memory || {};
            var lastReturn;
            var finalResult = {};

            runExecutable(0);

            return deferred.promise;

            // ------------------------------
            // Inner Functions
            // ------------------------------

            function runExecutable(executableSerial) {
                var nextArgs = {};

                // execute the connectiom
                processDef.process[executableSerial].forEach(function(currMap) {
                    // TODO:  handle connections in a more normal way...
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
                        // TODO: deal with invalid connection
                        console.log(currMap.type + ' is unknown.');
                    }
                });

                if (executableSerial + 1 < processDef.process.length) {
                    var currentExecutable = processDef.process[executableSerial + 1];

                    var executionPromise = null;
                    if (currentExecutable.type === 'process') {
                        executionPromise = self.executeProcess(currentExecutable.executeable, nextArgs, memory);
                    }
                    else if (currentExecutable.type === 'task') {
                        executionPromise = self._runTask(currentExecutable.executeable, nextArgs);
                    }
                    else {
                        // TODO: deal with unknown executable type
                        console.log('unknown executable type: ' + currentExecutable.type);
                    }

                    executionPromise.then(function(result) {
                        console.log('Result of ' + currentExecutable.executeable + ':');
                        console.log(JSON.stringify(result, null, 2));
                        lastReturn = result;

                        if (executableSerial + 2 < processDef.process.length) {
                            runExecutable(executableSerial+2);
                        }
                        else {
                            // TODO: deal with no end connection
                            console.log('no end connection!');
                        }
                    }, function(e) {
                        // TODO: deal with errors in execution of executables
                        console.log(e)
                        deferred.reject(e);
                    });
                }
                else {
                    console.log(JSON.stringify(finalResult));
                    deferred.resolve(finalResult);
                }
            }
        };
    });
});