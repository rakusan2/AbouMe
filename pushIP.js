"use strict";
const https = require('https');
const fs = require('fs');
let auth, options;
const pushOfline = {
    type: 'note',
    title: 'Server DOWN',
    body: 'Server went ofline'
};
fs.readFile(__dirname + '/auth.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    }
    else {
        auth = JSON.parse(data);
        options = {
            method: 'POST',
            hostname: 'api.pushbullet.com',
            path: '/v2/pushes',
            headers: { 'Access-Token': auth.key, 'Content-Type': 'application/json' }
        };
        ready();
    }
});
let isReady = false, toPost = [];
function ready() {
    while (toPost.length > 0) {
        postToServer(toPost.pop());
    }
    isReady = true;
}
function postToServer(data) {
    let pushreq = https.request(options, (msg) => {
        msg.on('data', (data) => console.log({ ServerMsg: JSON.parse(data) }));
    })
        .on('error', (err) => { console.error(err); });
    pushreq.end(JSON.stringify(data), 'utf8');
}
function post(data) {
    if (isReady)
        postToServer(data);
    else
        toPost.push(data);
}
function postIP(ip) {
    return {
        type: 'link',
        title: 'Server UP',
        body: 'Link to the local server',
        url: `http://${ip}:8000`
    };
}
function pushServerIP(ip) {
    post(postIP(ip));
}
exports.pushServerIP = pushServerIP;
