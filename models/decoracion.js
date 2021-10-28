const { Schema, model } = require('mongoose');

const DecoracionSchema = Schema({
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
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    }

}); 
DecoracionSchema.methods.toJSON = function(){
    const {__v, contraseña, ...decoracion}= this.toObject();
    return decoracion;
}
module.exports = model( 'Decoracion', DecoracionSchema);