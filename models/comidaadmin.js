const { Schema, model} = require ('mongoose');

const ComidaadminSchema = Schema({
    plato: {
        type: String,
        required: [true, "El nombre del plato de comida es obligatorio"]
    }
});


module.exports = model ( 'Comidaadmin', ComidaadminSchema)

