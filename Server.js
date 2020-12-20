const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port',process.env.PORT||3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);
let numUser=0;

    io.on('connection', (socket) => {
        console.log('New user connected: ', socket.id);
        numUser++;
        console.log('Number of user connected at this moment: ',numUser);
    
        socket.on('mensaje', (data)=>{
            io.sockets.emit('mensaje servidor', data);
        })
        socket.on('user',(data)=>{
            socket.emit('user servidor', data);
        })
            
        socket.on('escribiendo', (data)=>{
            socket.broadcast.emit('escribiendo servidor', data);
        })
        socket.on('disconnect', function () {
            console.log('User disconnected: ', socket.id);
            delete socket.id;
            numUser--;
            console.log('Number of user connected at this moment: ',numUser);
        })
       
    });


