const { Schema, model } = require('mongoose');

const MusicaSchema = Schema({
    salon: {
        type: String,
        required: [true, 'El nombre del salón es obligatorio'],
        emun: ['GOLDEN','PLATINUM','OTRO']
    },
    servicio: {
        type: String,
        required: [true, 'El tipo de servicio es obligatorio'],
        emun: ['salon','comida','musica','bartender','decoracion']
    },
    caracteristica: {
        type: String,
    },
    evento: {
        type: String,
    },
    grupo: {
        type: String,
    },
    precio: {
        type: Number,
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    nombreusuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    }
}); 
MusicaSchema.methods.toJSON = function(){
    const {__v, contraseña, ...musica}= this.toObject();
    return musica;
}
module.exports = model( 'Musica', MusicaSchema);
