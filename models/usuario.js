const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombreusuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },
    celular: {
        type: Number,
        required: [true, 'El número de celular es obligatorio'],
    },
    caracteristica: {
        type: String,
    },
    rol: {
        type: String,
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, contraseña, ...usuario}= this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
    