const { Schema, model} = require ('mongoose');

const SalonadminSchema = Schema({
    salon: {
        type: String,
        required: [true, "El salon es obligatorio"]
    }
});


module.exports = model ( 'Salonadmin', SalonadminSchema)