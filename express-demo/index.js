//require -- imports
const config = require('config');
const Joi = require('joi');
const logger = require('./middleware/logger.js');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

//set view template
app.set('view engine', 'pug');
app.set('views', './views'); // default
//load, call middleware
app.use(express.json()); // to enable parsing of json object from body of post request
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); // serve statice content to  api 
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

// Debugger
startupDebugger('logged with startupDebugger');
dbDebugger('logged with dbDebugger');

// ========= Main code starts here =============



//use env variable
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`));
