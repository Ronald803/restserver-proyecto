const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require( '../models/usuario' );
const Servicio = require( '../models/servicio');
const Comida = require( '../models/comida');

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


const usuariosComidaGet = (req=request,res=response) => {
    const {salon, fecha, usuario } = req.query;
    res.json({
            msg: 'Solicitud GET a comida, controlador',
            salon, fecha, usuario
    });
}
const usuariosComidaPut = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a comida, controlador',
            golden, platinum, externo
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


const usuariosMusicaGet = (req=request,res=response) => {
    const {salon, fecha, usuario} = req.query;
    res.json({
            msg: 'Solicitud GET a musica, controlador',
            salon, fecha, usuario
    });
}
const usuariosMusicaPut = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a musica, controlador',
            golden, platinum, externo
    });
}
const usuariosMusicaPost = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            golden, platinum, externo
    });
}
const usuariosMusicaDelete = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a musica, controlador',
            golden, platinum, externo
    });
}


const usuariosBartenderGet = (req=request,res=response) => {
    const { salon, fecha, usuario} = req.query;
    res.json({
            msg: 'Solicitud GET a bartender, controlador',
            salon,fecha,usuario
    });
}
const usuariosBartenderPut = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a bartender, controlador',
            golden, platinum, externo
    });
}
const usuariosBartenderPost = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a bartender, controlador',
            golden, platinum, externo
    });
}
const usuariosBartenderDelete = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a bartender, controlador',
            golden, platinum, externo
    });
}


const usuariosDecoracionesGet = (req=request,res=response) => {
    const {salon, fecha, usuario} = req.query;
    res.json({
            msg: 'Solicitud GET a decoraciones, controlador',
            salon, fecha, usuario
    });
}
const usuariosDecoracionesPut = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a decoraciones, controlador',
            golden, platinum, externo
    });
}
const usuariosDecoracionesPost = (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a decoraciones, controlador',
            golden, platinum, externo
    });
}
const usuariosDecoracionesDelete = (req=request,res=response) => {
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

    usuariosDecoracionesGet,
    usuariosDecoracionesPost,
    usuariosDecoracionesPut,
    usuariosDecoracionesDelete

}