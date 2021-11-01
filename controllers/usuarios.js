const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require( '../models/usuario' );
const Servicio = require( '../models/servicio');
const Comida = require( '../models/comida');
const Musica = require('../models/musica');
const Bartender = require('../models/bartender');
const Decoracion = require('../models/decoracion');

const usuariosSalonesGet = async (req=request,res=response) => {
            const{limite=5, desde=0, fecha} = req.query;
            const [total, usuarios] = await Promise.all([
                Usuario.countDocuments({fecha}),
                Usuario.find({fecha })
                .limit(Number(limite))
                .skip(Number(desde))
            ])
            res.json({
                total,
                usuarios,
            });
}   
const usuariosSalonesPut = async (req=request,res=response) => {
    console.log("peticion a put salones");
            const { id } = req.params;
            const {_id,servicio , caracteristica, precio, ...resto} = req.body;
            const usuario = await Usuario.findByIdAndUpdate( id, resto );
            res.json({
                msg: 'Solicitud PUT a salones, controlador',
                usuario, id 
            });
}
const usuariosSalonesPost = async (req=request,res=response) => {
            const {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña } = req.body;
            const usuario = new Usuario( {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña} );

            //Verificar si está reservado
            const existeFecha = await Usuario.findOne({ fecha,salon,servicio });
            if ( existeFecha   ) {
                return res.status(400).json({
                    msg: 'Esa fecha ya está apartada'
                })
            }  
            //Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            usuario.contraseña = bcryptjs.hashSync( contraseña, salt );
        
            //Guardar en BD
            await usuario.save();
        
        
            res.json({
                msg: 'Solicitud POST a salones, controlador',
                usuario, 
            });   
}
const usuariosSalonesDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        msg: 'Solicitud DELETE a salones, controlador',
        usuario
    });
}


const usuariosComidaGet = async (req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, comidas] = await Promise.all([
        Comida.countDocuments({fecha}),
        Comida.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json({
        total,
        comidas,
    });
}
const usuariosComidaPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {_id,servicio , caracteristica, precio, ...resto} = req.body;
    const comida = await Comida.findByIdAndUpdate( id, resto );
    res.json({
        msg: 'Solicitud PUT a comida, controlador',
        comida, id 
    });
}
const usuariosComidaPost= async(req=request,res=response) => {
    const {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña } = req.body;
    const comida = new Comida( {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña} );
    //Verificar si el Post es a la base de datos del servicio correcto
    if ( servicio != "comida"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio comida'
        })
    }
    //Verificar si está reservado
    const existeFecha = await Comida.findOne({ fecha,salon,servicio });
    if ( existeFecha ) {
        return res.status(400).json({
            msg: 'Esa fecha ya está apartada'
        })
    }  
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    comida.contraseña = bcryptjs.hashSync( contraseña, salt );
    //Guardar en BD
    await comida.save();
    res.json({
        msg: 'Solicitud POST a Comida, controlador',
        comida, 
    });    
}
const usuariosComidaDelete = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a comida, controlador',
            golden, platinum, externo
    });
}


const usuariosMusicaGet = async (req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, musica] = await Promise.all([
        Musica.countDocuments({fecha}),
        Musica.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json({
        total,
        musica,
    });
}
const usuariosMusicaPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {_id,servicio , caracteristica, precio, ...resto} = req.body;
    const musica = await Musica.findByIdAndUpdate( id, resto );
    res.json({
        msg: 'Solicitud PUT a musica, controlador',
        musica, id 
    });
}
const usuariosMusicaPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña } = req.body;
    const musica = new Musica( {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña} );
    if ( servicio != "musica"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio musica'
        })
    }
    //Verificar si está reservado
    const existeFecha = await Musica.findOne({ fecha,salon,servicio });
    if ( existeFecha ) {
        return res.status(400).json({
            msg: 'Esa fecha ya está apartada'
        })
    }
    //Guardar en BD
        await musica.save();
   
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            musica
    });
}
const usuariosMusicaDelete = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a musica, controlador',
            golden, platinum, externo
    });
}


const usuariosBartenderGet = async(req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, bartender] = await Promise.all([
        Bartender.countDocuments({fecha}),
        Bartender.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json({
        total,
        bartender,
    });
}
const usuariosBartenderPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {_id,servicio , caracteristica, precio, ...resto} = req.body;
    const bartender = await Bartender.findByIdAndUpdate( id, resto );
    res.json({
        msg: 'Solicitud PUT a bartender, controlador',
        bartender, id 
    });
}
const usuariosBartenderPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña } = req.body;
    const bartender = new Bartender( {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña} );
    if ( servicio != "bartender"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio bartender'
        })
    }
    //Verificar si está reservado
    const existeFecha = await Bartender.findOne({ fecha,salon,servicio });
    if ( existeFecha ) {
        return res.status(400).json({
            msg: 'Esa fecha ya está apartada'
        })
    }
    //Guardar en BD
        await bartender.save();
   
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            bartender
    });
}
const usuariosBartenderDelete = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a bartender, controlador',
            golden, platinum, externo
    });
}


const usuariosDecoracionGet = async (req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, decoracion] = await Promise.all([
        Decoracion.countDocuments({fecha}),
        Decoracion.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json({
        total,
        decoracion,
    });
}
const usuariosDecoracionPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {_id,servicio , caracteristica, precio, ...resto} = req.body;
    const decoracion = await Decoracion.findByIdAndUpdate( id, resto );
    res.json({
        msg: 'Solicitud PUT a decoracion, controlador',
        decoracion, id 
    });
}
const usuariosDecoracionPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña } = req.body;
    const decoracion = new Decoracion( {salon, servicio, caracteristica, precio, fecha, nombreusuario, contraseña} );
    if ( servicio != "decoracion"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio decoracion'
        })
    }
    //Verificar si está reservado
    const existeFecha = await Decoracion.findOne({ fecha,salon,servicio });
    if ( existeFecha ) {
        return res.status(400).json({
            msg: 'Esa fecha ya está apartada'
        })
    }
    //Guardar en BD
        await decoracion.save();
   
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            decoracion
    });
}

const usuariosDecoracionDelete = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a decoraciones, controlador',
            golden, platinum, externo
    });
}



module.exports = {
    usuariosSalonesGet,
    usuariosSalonesPost,
    usuariosSalonesPut,
    usuariosSalonesDelete,
    
    usuariosMusicaGet,
    usuariosMusicaPost,
    usuariosMusicaPut,
    usuariosMusicaDelete,
    
    usuariosBartenderGet,
    usuariosBartenderPost,
    usuariosBartenderPut,
    usuariosBartenderDelete,

    usuariosComidaGet,
    usuariosComidaPost,
    usuariosComidaPut,
    usuariosComidaDelete,

    usuariosDecoracionGet,
    usuariosDecoracionPost,
    usuariosDecoracionPut,
    usuariosDecoracionDelete

}