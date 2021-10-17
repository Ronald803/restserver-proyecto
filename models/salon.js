const { Schema, model} = require ('mongoose');

const SalonSchema = Schema({
    salon: {
        type: String,
        required: [true, "El salon es obligatorio"]
    }
});


module.exports = model ( 'Salon', SalonSchema)