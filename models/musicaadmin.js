const { Schema, model} = require ('mongoose');

const MusicaadminSchema = Schema({
    grupo: {
        type: String,
        required: [true, "El nombre de grupo es obligatorio"]
    }
});

module.exports = model ( 'Musicaadmin', MusicaadminSchema)

