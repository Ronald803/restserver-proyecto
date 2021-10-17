const Salon = require('../models/salon');
const Servicio = require('../models/servicio');


const esSalonValido = async (salon= '' ) => {
    const existSalon= await Salon.findOne({ salon });
    if ( !existSalon ) {
        throw new Error(`El salon ${ salon} no esta registrado en la base de datos`)
    }
}

const esServicioValido = async (servicio= '' ) => {
    const existServicio= await Servicio.findOne({ servicio });
    if ( !existServicio ) {
        throw new Error(`El servicio ${ servicio } no esta registrado en la base de datos`)
    }
}


module.exports = {
    esSalonValido, esServicioValido
}