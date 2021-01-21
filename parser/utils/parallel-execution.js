function parallelExecution(tasks, concurency) {
    return new Promise(resolve => {
        let running = 0;
        let next = 0;
        let results = new Array(tasks.length).fill(null);

        console.log(`Left: ${tasks.length - next + running}/${tasks.length}`);

        function processNextTask() {
            running++;
            const taskIndex = next++;
            tasks[taskIndex]()
                .then(taskResult => {
                    results[taskIndex] = taskResult;
                })
                .catch(e => {
                    console.log("Task failed:", taskIndex, e);
                    results[taskIndex] = e;
                })
                .finally(() => {
                    running--;
                    console.log(
                        `Left: ${tasks.length - next + running}/${tasks.length}`
                    );
                    if (next < tasks.length) {
                        processNextTask();
                        return;
                    }
                    if (running === 0) {
                        return resolve(results);
                    }
                });
        }

        while (running < concurency) {
            processNextTask();
        }
    });
}

module.exports = parallelExecution;
