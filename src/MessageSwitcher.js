var Utils = require('./Utils.js');
var utils = new Utils();

var MatchingRoom = require('./MatchingRoom.js');
var InputRelay = require('./InputRelay.js');

var MessageSwitcher = function(server){
  this.server = server;
  this.matchingRoom = new MatchingRoom(this.server);
  this.inputRelay = new InputRelay(this.server);
}

MessageSwitcher.prototype.sendTestMessage = function(port,address){
  this.server.send("Yeah I'm Switcher",port,address);
}

MessageSwitcher.prototype.switchMessage = function(msg,port,address){
  try{
    var json = JSON.parse(msg);
    if(!json['type']){
      utils.sendErrorJson("it is not include type",port,address,this.server);
      return false;
    }

    switch (json['type']) {
      case "match":
      {
        utils.writeLogWithDate(`server got: ${msg} from ${address}:${port}`);
        this.matchingRoom.join(json,port,address);
        break;
      }
      case "input":
      {
        //ログの容量が大きくなってしまうから出力しない
        //utils.writeLogWithDate(`server got: ${msg} from ${address}:${port}`);
        this.inputRelay.relay(json,port,address);
        break;
      }
      case "hit-bullet":
      {
        //ログの容量が大きくなってしまうから出力しない
        //utils.writeLogWithDate(`server got: ${msg} from ${address}:${port}`);
        this.inputRelay.hitInfoRelay(json,port,address);
        break;
      }
      default:
      {
        utils.writeLogWithDate(`server got: ${msg} from ${address}:${port}`);
        utils.sendErrorJson("unknown type",port,address,this.server);
        break;
      }
    }

  }catch(e){
    utils.sendErrorJson(e.message,port,address,this.server);
    return false;
  }
  return true;
}

module.exports = MessageSwitcher;
