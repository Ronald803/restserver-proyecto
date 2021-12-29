const Salon     = require('../models/salon');
const Servicio  = require('../models/servicio');
const Usuario   = require('../models/usuario');
const Comida    = require('../models/comida');
const Musica    = require('../models/musica');
const Bartender = require('../models/bartender');
const Decoracion = require('../models/decoracion');

const Salonadmin    = require('../models/salonadmin');
const Comidaadmin   = require('../models/comidaadmin');
const Musicaadmin   = require('../models/musicaadmin');

const esGrupoValido = async (grupo= '' ) => {
    const existGrupo= await Musicaadmin.findOne({ grupo });
    if ( !existGrupo ) {
        throw new Error(`El grupo ${ grupo } no esta disponible`)
    }
}
const esPlatoValido = async (plato= '' ) => {
    const existPlato= await Comidaadmin.findOne({ plato });
    if ( !existPlato ) {
        throw new Error(`El plato ${ plato } no esta disponible`)
    }
}
const esSalonValido = async (salon= '' ) => {
    const existSalon= await Salonadmin.findOne({ salon });
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

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id); 
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeReservaSalonPorId = async (id) => {
    const existeReserva = await Salon.findById(id); 
    if(!existeReserva) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeReservaComidaPorId = async (id) => {
    const existeReserva = await Comida.findById(id); 
    if(!existeReserva) {
        throw new Error(`El id no existe ${id}`);
    }
}
const existeReservaMusicaPorId = async (id) => {
    const existeReserva = await Musica.findById(id); 
    if(!existeReserva) {
        throw new Error(`El id no existe ${id}`);
    }
}
const existeReservaBartenderPorId = async (id) => {
    const existeReserva = await Bartender.findById(id); 
    if(!existeReserva) {
        throw new Error(`El id no existe ${id}`);
    }
}
const existeReservaDecoracionPorId = async (id) => {
    const existeReserva = await Decoracion.findById(id); 
    if(!existeReserva) {
        throw new Error(`El id no existe ${id}`);
    }
}
module.exports = {
    esSalonValido, 
    esServicioValido,
    esPlatoValido,
    esGrupoValido,
    existeUsuarioPorId, 
    existeReservaSalonPorId,
    existeReservaComidaPorId,
    existeReservaMusicaPorId,
    existeReservaBartenderPorId,
    existeReservaDecoracionPorId
}