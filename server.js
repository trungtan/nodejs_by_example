/**
 * Created by tan.bui on 9.1.2017.
 */

"user strict";

const http = require('http');
const path = require("path");
const file = require('./libs/file');

const assets = function(req, res) {
    if (req.url === '/') {
        req.url = '/index.html';
    }
    file(req, res, path.normalize(__dirname + req.url));
    console.log();
};

const port = 3000;
const host = '127.0.0.1';
const app = http.createServer(assets).listen(port, host);
console.log("Listening on " + host + ":" + port);