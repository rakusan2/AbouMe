"use strict";
const https = require('https');
const fs = require('fs');
let auth, options;
const pushOfline = {
    type: 'note',
    title: 'Server DOWN',
    body: 'Server went ofline'
}, pushException = {
    type: 'note',
    title: 'Server Crashed',
    body: 'Server Crashed'
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
        let post = toPost.pop();
        postToServer(post.data, post.callback);
    }
    isReady = true;
}
function postToServer(data, callback) {
    let pushreq = https.request(options, (msg) => {
        msg.on('data', (data) => console.log({ ServerMsg: JSON.parse(data) }));
        if (callback)
            callback();
    })
        .on('error', (err) => {
        console.error(err);
        if (callback)
            callback();
    });
    pushreq.end(JSON.stringify(data), 'utf8');
}
function post(data, callback) {
    if (isReady)
        postToServer(data, callback);
    else
        toPost.push({ data: data, callback: callback });
}
function postIP(ip) {
    return {
        type: 'link',
        title: 'Server UP',
        body: 'Link to the local server',
        url: `http://${ip}:8000`
    };
}
function postDown(signal) {
    return {
        type: 'note',
        title: 'Server Down',
        body: `Server Down due to ${signal}`
    };
}
function pushServerIP(ip) {
    post(postIP(ip));
}
exports.pushServerIP = pushServerIP;
function pushServerDown(signal, callback) {
    console.log('posting down');
    post(postDown(signal), callback);
}
exports.pushServerDown = pushServerDown;
function pushServerException() {
    post(pushException);
}
exports.pushServerException = pushServerException;
