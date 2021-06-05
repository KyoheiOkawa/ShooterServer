const PORT = 33333

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var MessageSwitcher = require('./src/MessageSwitcher.js');
var switcher = new MessageSwitcher(server);

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  switcher.switchMessage(msg,rinfo.port,rinfo.address);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(PORT);
