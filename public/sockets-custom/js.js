var socket = io()
socket.on('connect', () => {
    console.log('Conectado al servidor');
})


socket.on('disconnect', () => {
    console.log('Servidor desconectado');
})

//emitir mensaje:
socket.emit('enviarMensaje', {
    usuario: 'Jesus',
    mensaje: 'Hola mundo desde socket'
})

socket.on('enviarMensaje', (data) => {
    console.log(data.usuario, data.mensaje);
})