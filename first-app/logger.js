var url = 'http://mylogger.com/log';

function log(message){
    // Send a HTTP request
    console.log(message);
}

//export
module.exports.mylog = log;