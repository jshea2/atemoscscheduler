//const OBSWebSocket = require('obs-websocket-js');
const schedule = require('node-schedule');
const { Client, Server } = require('node-osc');
const fs = require('fs');

//OSC Client (OUT) Config
const oscClientIp = "127.0.0.1";
const oscPortOut = 3333;

const client = new Client(oscClientIp, oscPortOut);

let jobs = [];

function loadSchedules() {
    // Cancel all existing scheduled jobs
    jobs.forEach(job => job.cancel());
    jobs = [];

    // Read and parse the updated configuration file
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

    // Schedule new jobs
    config.schedules.forEach(sch => {
        const startStreamingTime = new Date(sch.startTime);
        const stopStreamingTime = new Date(sch.stopTime);

        // Schedule start streaming
        const startJob = schedule.scheduleJob(startStreamingTime, function() {
            client.send("/atem/stream/start");
            client.send("/atem/recording/start");

        });

        // Schedule stop streaming
        const stopJob = schedule.scheduleJob(stopStreamingTime, function() {
            client.send("/atem/stream/stop");
            client.send("/atem/recording/stop");
        });

        jobs.push(startJob, stopJob);
    });
}

// Initial load of schedules
loadSchedules();

// // Watch the config file for changes
fs.watch('config.json', (eventType, filename) => {
    if (filename && eventType === 'change') {
        console.log('Config file changed. Reloading schedules...');
        loadSchedules();
    }
});

