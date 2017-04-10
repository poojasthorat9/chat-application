var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Initialize appication with root of the application
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname + '/index.html'));
});
//Printing user connection and diconnection on the console
io.on('connection', function(socket){
  console.log('User connected');
    socket.on('disconnect', function(){
      console.log('User disconnected');
});
});
 
// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });

//Notify user is typing
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});
 
// Listen application request on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
