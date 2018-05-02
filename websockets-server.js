var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var msgstr = null;

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");
  messages.forEach(function(msg) {
    socket.send(msg);
  });


  socket.on("message", function(data) {
    console.log("message received: " + data);

    if (data.startsWith("/topic")) {
      console.log(data);
      msgstr = data.slice(6);
      var conmsg = "*** Topic has changed to " + msgstr;
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(conmsg);
      });
      var newmsg = "*** Topic is" + msgstr;
      messages.unshift(newmsg);

    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data);
      });
    }
  });
});
