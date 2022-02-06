const { Schema, model } = require('mongoose');

const BartenderSchema = Schema({
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
    bartenderpro: {
        type: Number,
    },
    garzones: {
        type: Number,
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
BartenderSchema.methods.toJSON = function(){
    const {__v, contraseña, ...bartender}= this.toObject();
    return bartender;
}
module.exports = model( 'Bartender', BartenderSchema);