/**
 * Created by tan.bui on 9.1.2017.
 */

"use strict";

module.exports = {
    sendError: function (res, message, code) {
        if (code === undefined) {
            code = 404;
        }
        res.writeHead(code, {'Content-Type': 'text/html'});
        res.end(message);
    },

    serve: function ( res, file ) {
        let contentType;
        switch(file.ext.toLowerCase()) {
            case "css": contentType = "text/css"; break;
            case "html": contentType = "text/html"; break;
            case "js": contentType = "application/javascript"; break;
            case "ico": contentType = "image/ico"; break;
            case "json": contentType = "application/json"; break;
            case "jpg": contentType = "image/jpeg"; break;
            case "jpeg": contentType = "image/jpeg"; break;
            case "png": contentType = "image/png"; break;
            default: contentType = "text/plain";
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.end(file.content);
    }

};