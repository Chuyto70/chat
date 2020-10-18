var socket = io();

let params = new URLSearchParams(window.location.search)

if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre deb ir')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados: ', resp);
    })

    socket.on('crearMensaje', (data) => {
        console.log(data);

    })

    socket.on('listado', function(e) {
        console.log(e);
    })


    socket.on('mensajePrivado', function(mensaje) {
        console.log('Mnesjae privado ', mensaje);
    })



});