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
module.exports = {
    ...Salon,
    ...Servicio,
    ...Usuario,
    ...Comida,
    ...Musica,
    ...Bartender,
    ...Decoracion,
    ...Salonadmin,
    ...Comidaadmin,
    ...Musicaadmin
}