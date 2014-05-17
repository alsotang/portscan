var net = require('net');
var _ = require('lodash');
var async = require('async');

var host = 'cnodejs.org';
var portRange = _.range(10000);


async.mapLimit(portRange, 50, function (port, done) {
  var client = net.connect({host: host, port: port});
  client.on('connect', function () {
    client.destroy();
    console.log({port: port, status: 'open'});
    done(null, {port: port, status: 'open'});
  });
  client.on('error', function () {
    done(null, {port: port, status: 'close'});
  });
}, function (err, results) {
  if (err) {
    throw err;
  }
  // console.log(results);
});

