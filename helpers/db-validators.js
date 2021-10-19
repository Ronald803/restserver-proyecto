const Salon = require('../models/salon');
const Servicio = require('../models/servicio');
const Usuario = require('../models/usuario');


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

const existeReservaPorId = async (id) => {
    const existeReserva = await Usuario.findById(id); 
    if(!existeReserva) {
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    esSalonValido, esServicioValido, existeReservaPorId
}