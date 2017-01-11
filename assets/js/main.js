/**
 * Created by tan.bui on 9.1.2017.
 */
import { log } from './modules/log';

var ejs = require('ejs'),
    people = ['geddy', 'neil', 'alex'],
    html = ejs.render('<%= people.join(", "); %>', {people: people});

log('Check modular client working');

let body = document.querySelector('body');
body.textContent = html;