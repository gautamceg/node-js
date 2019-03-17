// load module
const logger = require('./logger')
function sayHello(message) {
    console.log(message);
}

sayHello("Hello World !!");

// use loaded module
logger.mylog("This is sample log message");