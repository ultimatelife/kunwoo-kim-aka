var fs = require("fs");
var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');

var config = {
    username:'kimkunwoo',
    host:'localhost',
    // agent : process.env.SSH_AUTH_SOCK,
    privateKey: require('fs').readFileSync('/Users/kimkunwoo/.ssh/id_rsa'),
    port:22,
    dstHost : 'ubuntu1/192.168.219.194',
    dstPort : 27017,
    // localHost : '127.0.0.1',
    // password: '1234',
    localPort: 27000
};

var server = tunnel(config, function (error, server) {
    if(error){
        console.log("SSH connection error: " + error);
    }
    mongoose.connect('mongodb://localhost:27000/test');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log("DB connection successful");
    });
});
