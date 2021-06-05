require('date-utils');

var Utils = function(){

}

Utils.prototype.sendErrorJson = function(errMsg,port,address,server){
  var data = {};
  data['type'] = "error";
  data['msg'] = errMsg;

  server.send(JSON.stringify(data),port,address);
  console.log(this.getDateStr() + `: server send: ${JSON.stringify(data)} to ${address}:${port}`);
}

Utils.prototype.sendJsonAndWriteLog = function(json,port,address,server,isWriteLog=true){
  var jsonStr = JSON.stringify(json);
  server.send(jsonStr,port,address);
  if(isWriteLog)
    console.log(this.getDateStr() + `: server send: ${jsonStr} to ${address}:${port}`);
}

Utils.prototype.getUniqueStr = function(myStrong){
  var strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

Utils.prototype.getDateStr = function(){
  var dt = new Date();
  var formatted = dt.toFormat("YYYY/MM/DD HH24hMImSSs");
  return formatted;
}

Utils.prototype.writeLogWithDate = function(str){
  console.log(this.getDateStr() + ': ' + str);
}

module.exports = Utils;
