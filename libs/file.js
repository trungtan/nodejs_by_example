/**
 * Created by tan.bui on 9.1.2017.
 */

"use strict";
const fs = require("fs");
const content = require("./content");

const files = {};

module.exports = function (req, res, filePath) {
    if (files[filePath]) {                                  //check caching
        content.serve(res, files[filePath]);
    } else {
        fs.readFile(filePath, (err, data) => {
            if(err) {
                content.sendError(res, `Error reading ${filePath}.`);
                return false;
            }
            files[filePath] = {
                ext: filePath.split(".").pop(),
                content: data
            };
            content.serve(res, files[filePath]);
        })
    }
};