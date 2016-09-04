"use strict";
const express = require('express');
const displayIP_1 = require('./displayIP');
const pushIP = require('./pushIP');
let app = express();
let ip = displayIP_1.default();
const siteDir = __dirname + '/docs';
app.get('/', (req, res) => { res.sendFile(siteDir + '/index.html'); });
app.use('/js', express.static(siteDir + '/js'));
app.use('/css', express.static(siteDir + '/css'));
app.listen(8000, () => {
    for (let i = 0; i < ip.length; i++) {
        console.log(`listening on ${ip[i]}:8000`);
        pushIP.pushServerIP(ip[i]);
    }
});
