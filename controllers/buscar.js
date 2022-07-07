const { response,request } = require ('express');
const { ObjectId } = require ('mongoose').Types;
const { Usuario } = require('../models/usuario'); 

const serviciosPermitidos = [
    'usuarios',
    'musicaadmins',
    'comidas',
    'servicios'
];

const buscarUsuarios = async (termino = '', res = response) =>{
    const esMongoID = ObjectId.isValid( termino );
    if ( esMongoID ){
        const usuario = await Usuario.find(termino);
        res.json(usuario)    
    }
}
const buscar =( req, res = response) =>{
    const { servicio, termino } = req.params;
    if ( !serviciosPermitidos.includes( servicio )) {
        return res.status(400).json({
            msg: `Las categorias de busqueda permitidas son: ${ serviciosPermitidos }`
        })
    }

    switch (servicio) {
        case 'usuarios':
        buscarUsuarios(termino, res);

        break;
        case 'musicaadmins':
        break;
        case 'comidas':
        break;
        case 'servicios':
        break;
        default:
            res.status(500).json({
                msg: "Error con la categoría de busqueda"
            })

    }

  
}

module.exports = {
    buscar
}