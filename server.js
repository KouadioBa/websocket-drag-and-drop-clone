var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Reponse du serveur
app.get("/", function(req, res){
  res.sendFile(__dirname + '/index.html');
})

// Voir ou écouter les client connecter ou déconnecter
io.on('connection', function(socket){
  console.log('Un client est connecté');
  socket.on('disconnect', function(){
    console.log('Un client est déconnecté');
  })
  socket.on('chat message', function(msg){
    console.log('message reçu : ' + msg);
    // envoyé le sms au serveur sur la page web
    io.emit('chat message', msg)
  })
})

// Requêtte sur le serveur
http.listen(3000, function(){
  console.log("Le serveur à démarrer sur le port 3000")
})