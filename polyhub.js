var serverURL = 'http://192.168.1.4:8080/';
var request = require('request');

function invalidCmd(msg, cmd, payload) {
  msg.say(msg.user + ': Invalid polyhub command ' + cmd)
};

function errmsg(err, msg, cmd, payload) {
  if (err) return msg.say(msg.user + ': Oops - there was an error -\n' + err.toString());
}

var handlers = {};

// echo string_to_echo
handlers.echo = function (msg, cmd, payload) {
  msg.say(msg.user + ': Hello from the new bot - you said ' + payload)
};

// get url
handlers.get = function (msg, cmd, payload) {
  request.get(payload, function (err, res, body) {
    if (err) return errmsg(err, msg, cmd, payload);
    msg.say(msg.user + ': Your results:\n' + body)
  });
};

// register moniker data
handlers.register = function (msg, cmd, payload) {
request.post({
  var parts = payload.split(' ');
  url: serverURL +
       'members?moniker=' + parts[0] + 
       '&data=' + JSON.stringify(parts[1])
  },
  function (err, res, body) {
    if (err) return errmsg(err, msg, cmd, payload);
    msg.say(msg.user + ': Your results:\n' + body)
  });
};

module.exports = function (msg) {
  var cmd = msg.match_data[1];
  var payload = msg.match_data[2];

  if (~Object.keys(handlers).indexOf(cmd)) {
    handlers[cmd](msg, cmd, payload);
  } else {
    invalidCmd(msg, cmd, payload);
  }
};
