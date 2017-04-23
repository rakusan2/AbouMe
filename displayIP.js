"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
let ss = new RegExp('Virtual');
function getIP() {
    let interF = os.networkInterfaces(), ip = [];
    Object.keys(interF).forEach((fKey) => {
        if (fKey.search(ss) < 0)
            interF[fKey].forEach((iFace) => {
                if (iFace.family === 'IPv4' && !iFace.internal)
                    ip.push(iFace.address);
            });
    });
    return ip;
}
exports.default = getIP;
