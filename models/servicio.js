const { Schema, model} = require ('mongoose');

const ServicioSchema = Schema({
    servicio: {
        type: String,
        required: [true, "El salon es obligatorio"]
    }
});


module.exports = model ( 'Servicio', ServicioSchema)