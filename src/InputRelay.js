var Utils = require('./Utils.js');
var utils = new Utils();

var InputRelay = function(server){
  this.server = server;
}

InputRelay.prototype.relay = function(json,port,address){
  var to = JSON.parse(json['rival']);
  var sendData = {};
  sendData['type'] = "rival-input";
  sendData['requireNextFrame'] = json['requireNextFrame'];
  sendData['inputObjects'] = json['inputObjects'];
  utils.sendJsonAndWriteLog(sendData,to['port'],to['address'],this.server,false);
}

InputRelay.prototype.hitInfoRelay = function(json,port,address){
  var to = JSON.parse(json['rival']);
  var sendData = {};
  sendData['type'] = "hit-bullet";
  sendData['bulletType'] = json['bulletType'];
  sendData['fireFrame'] = json['fireFrame'];
  sendData['own'] = json['rival'];
  sendData['rival'] = json['own'];
  utils.sendJsonAndWriteLog(sendData,to['port'],to['address'],this.server,false);
}

module.exports = InputRelay;
