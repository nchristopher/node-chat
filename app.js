/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3100;


app.configure(function(){
  app.set('port', process.env.PORT || port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade'); 
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
server.listen(port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.emit('message', { message: 'This is just a first version, more awesomeness soon to follow' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
