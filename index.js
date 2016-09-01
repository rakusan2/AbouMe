"use strict";
const express = require('express');
let app = express();
app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
app.use('/js', express.static(__dirname + '/js'));
app.use('css', express.static(__dirname + '/styles'));
app.listen(8000, () => { console.log('listening on port 8000'); });
