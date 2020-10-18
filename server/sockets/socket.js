const { io } = require('../server');

const { Usuarios } = require('../../classes/usuario')
const { crearMensaje } = require('../../utilidades/utilidades')

let usuarios = new Usuarios

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data, callback) => {

        console.log(data);

        if (!data.nombre || !data.sala) {
            callback({
                error: true,
                mensjae: 'Hay un error en el servdor'
            })
        }

        client.join(data.sala)

        usuarios.agregarPersona(client.id, data.nombre, data.sala)

        client.broadcast.to(data.sala).emit('listado', usuarios.getPersonaSala(data.sala))

        callback(usuarios.getPersonaSala(data.sala))
    })

    client.on('crearMensaje', (data) => {


        let mensaje = crearMensaje(data.nombre, data.mensaje)

        client.broadcast.to(data.sala).emit('crearMensaje', mensaje)
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} se desconecto`))
        client.broadcast.to(personaBorrada.sala).emit('listado', usuarios.getPersonaSala(personaBorrada.sala))
            //return personaBorrada
    })

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});