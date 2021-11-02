const app = require('./app');
const server = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);


io.on('connection', async (socket) => {
    // // return all Socket instances
    // const sockets = await io.fetchSockets();    
    // for (const socket of sockets) {
    //     console.log(socket.id);
    //   }
    // socket.broadcast.emit('fetch_connected', sockets);

    socket.on('open_chat', (arg) => {
        socket.emit('open_chat', arg);
        socket.broadcast.emit('open_chat', arg);
    });

    socket.on('close_chat', (arg) => {
        socket.emit('close_chat', arg);
        socket.broadcast.emit('close_chat', arg);
    });

    socket.on('send_msg', (arg) => {
        socket.emit('send_msg', arg);
        socket.broadcast.emit('send_msg', arg);
    });

    socket.on('disconnect', (reason) => {
        
    });
});

module.exports = server;