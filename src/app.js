const express = require('express');
const app = express();

// Creamos el servidor HTTP con la librería de Express
const http = require('http').Server(app);

// Generamos una comunicación con Socket.io
const io = require('socket.io')(http);

// Carga los archivos estáticos desde la carpeta "public"
app.use(express.static(__dirname + "/public"));

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Manejar las ofertas SDP y respuestas
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    // Manejar los candidatos ICE
    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

http.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
