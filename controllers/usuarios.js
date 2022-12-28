const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require( '../models/usuario' );
const Servicio = require( '../models/servicio');
const Comida = require( '../models/comida');
const Musica = require('../models/musica');
const Bartender = require('../models/bartender');
const Decoracion = require('../models/decoracion');
const Salon = require('../models/salon');
////////////////////////////solicitudes usuario//////////////////////////////////
const usuariosGet = async (req=request,res=response) => {
    const{limite=5, desde=0, nombreusuario} = req.query;
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({nombreusuario}),
        Usuario.find({nombreusuario})
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json(
        usuarios
    );
}   
const usuariosPut = async (req=request,res=response) => {
console.log("peticion a put usuarios");
    const { id } = req.params;
    const {_id,contraseña, rol, celular, correo} = req.body;
    const usuarioAutenticado = req.usuario;
    if(id == req.usuario.id || req.usuario.rol == "ADMINISTRADOR"){
        const usuario = await Usuario.findByIdAndUpdate(id, {rol,celular,correo});
        res.json( usuario );
        } else {
            res.json({ msg: 'Acción denegada' });    
        }
}
const usuariosPost = async (req=request,res=response) => {
   const {nombreusuario, contraseña, correo, celular, caracteristica, rol } = req.body;
    const usuario = new Usuario( {nombreusuario, contraseña, correo, celular, caracteristica, rol} );
    //Verificar si el usuario ya está registrado
    const existeNombreUsuario = await Usuario.findOne({ nombreusuario });
    if ( existeNombreUsuario   ) {
        return res.status(400).json({
            msg: 'Ese nombre de usuario ya está apartado'
        })
    }  
    const existeCorreo = await Usuario.findOne({ correo });
    if ( existeCorreo ) {
        return res.status(400).json({
            msg: 'El correo electronico ya fue registrado por otra cuenta'
        })
    }
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync( contraseña, salt );

   //Guardar en BD
    await usuario.save();
    const token = await generarJWT( usuario.id ); 

    res.json({
            usuario,
            token
    }
    );   
}
const usuariosDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const usuarioAutenticado = req.usuario;
    if(id == req.usuario.id || req.usuario.rol == "ADMINISTRADOR"){
        const usuario = await Usuario.findByIdAndUpdate(id, { caracteristica: "eliminado"});
        res.json({ msg: 'Solicitud DELETE a salones, controlador', usuario, usuarioAutenticado });
        } else {
            res.json({ msg: 'Acción denegada' });    
        }
    }
///////////////////////////solicitudes salones///////////////////////////////////
const usuariosSalonesGet = async (req=request,res=response) => {
            const{desde=0, fecha} = req.query;
            const [total, salons] = await Promise.all([
                Salon.countDocuments({fecha}),
                Salon.find({fecha })
                .skip(Number(desde))
            ])
            res.json(
                salons
            );
}   
const usuariosSalonesPut = async (req=request,res=response) => {
    console.log("peticion a put salones");
            const { id } = req.params;
            const {fecha,salon} = req.body;
            const caracteristica = "reservado";
            const auxsalon = await Salon.find({fecha,salon,caracteristica})
            if (auxsalon.length === 0){
                const sssalon = await Salon.findByIdAndUpdate( id, {fecha,salon} );
                    res.json(sssalon);    
            } else{
                res.json({
                    msg: `El salon ${salon} para la fecha ${fecha} ya fue reservado`
                })    
            }
}
const usuariosSalonesPost = async (req=request,res=response) => {
            const {salon, servicio, caracteristica, evento, precio, fecha } = req.body;
            const nombreusuario = req.usuario.nombreusuario; 
            const sssalon = new Salon( {salon, servicio, caracteristica, evento, precio, fecha, nombreusuario} );
            //Verificar si está reservado
            const existeFecha = await Salon.findOne({ fecha,salon,servicio,caracteristica });
            if ( existeFecha ) {
                return res.status(400).json({
                msg: 'Esa fecha ya está apartada'
                })
            }  
            //Verificar si el Post es a la base de datos del servicio correcto
            if ( servicio != "salones"){ 
                return res.status(400).json({
                    msg: 'Peticion post debe ser a servicio salones'
                })
            }
            //Guardar en BD
            await sssalon.save();
        
            res.json({
                msg: 'Solicitud POST a salones, controlador',
                sssalon, 
            });   
}
const usuariosSalonesDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const salon = await Salon.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        msg: 'Solicitud DELETE a salones, controlador',
        salon
    });
}
//////////////////////////solicitudes comida////////////////////////////////////
const usuariosComidaGet = async (req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, comidas] = await Promise.all([
        Comida.countDocuments({fecha}),
        Comida.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json(
        comidas
    );
}
const usuariosComidaPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {fecha,salon,plato,invitados} = req.body;
    const comida = await Comida.findByIdAndUpdate( id, {fecha,salon,plato,invitados} );
    res.json(comida);
}
const usuariosComidaPost= async(req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, plato, invitados, precio, fecha } = req.body;
    const nombreusuario = req.usuario.nombreusuario;
    const comida = new Comida( {salon, servicio, caracteristica, evento, plato, invitados, precio, fecha, nombreusuario} );
    //Verificar si el Post es a la base de datos del servicio correcto
    if ( servicio != "comida"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio comida'
        })
    }
    //Guardar en BD
    await comida.save();
    res.json({
        msg: 'Solicitud POST a Comida, controlador',
        comida, 
    });    
}
const usuariosComidaDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const comida = await Comida.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        msg: 'Solicitud DELETE a comida, controlador',
        comida
    });
}
//////////////////////////solicitudes musica////////////////////////////////////
const usuariosMusicaGet = async (req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, musica] = await Promise.all([
        Musica.countDocuments({fecha}),
        Musica.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json(
        musica
    );
}
const usuariosMusicaPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {fecha, grupo, salon} = req.body;
    const caracteristica = "reservado";
    const auxmusica = await Musica.find({fecha,grupo,caracteristica})
    if(auxmusica.length === 0){
        const musica = await Musica.findByIdAndUpdate( id, {fecha, grupo, salon} );
            res.json(musica);
    }else{
        res.json({
            msg: `El grupo ${grupo} para la fecha ${fecha} ya fue reservado`
        })
    }
}
const usuariosMusicaPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, grupo, precio, fecha} = req.body;
    const nombreusuario = req.usuario.nombreusuario;
    const musica = new Musica( {salon, servicio, caracteristica, evento, grupo, precio, fecha, nombreusuario} );
    if ( servicio != "musica"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio musica'
        })
    }
    //Verificar si está reservado
    const existeFecha = await Musica.findOne({ fecha,grupo,servicio });
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
const usuariosMusicaDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const musica = await Musica.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        msg: 'Solicitud DELETE a musica, controlador',
        musica
    });
}
////////////////////////solicitudes bartender//////////////////////////////////
const usuariosBartenderGet = async(req=request,res=response) => {
    const{limite=5, desde=0, fecha} = req.query;
    const [total, bartender] = await Promise.all([
        Bartender.countDocuments({fecha}),
        Bartender.find({fecha })
        .limit(Number(limite))
        .skip(Number(desde))
    ])
    res.json(
        bartender
        );
}
const usuariosBartenderPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {bartenderpro,garzones,fecha,salon} = req.body;
    const bartender = await Bartender.findByIdAndUpdate( id, {fecha, salon, garzones, bartenderpro} );
    res.json(bartender);
}
const usuariosBartenderPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, bartenderpro, garzones,precio, fecha} = req.body;
    const nombreusuario = req.usuario.nombreusuario;
    const bartender = new Bartender( {salon, servicio, caracteristica, evento, bartenderpro, garzones, precio, fecha, nombreusuario} );
    if ( servicio != "bartender"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio bartender'
        })
    }
    //Guardar en BD
        await bartender.save();
   
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            bartender
    });
}
const usuariosBartenderDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const bartender = await Bartender.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        msg: 'Solicitud DELETE a bartender, controlador',
        bartender
    });
}
////////////////////////solicitudes decoracion/////////////////////////////////
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
    res.json(decoracion);
}
const usuariosDecoracionPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, flores, centromesa, precio, fecha } = req.body;
    const nombreusuario = req.usuario.nombreusuario;
    const decoracion = new Decoracion( {salon, servicio, caracteristica, evento, flores, centromesa, precio, fecha, nombreusuario} );
    if ( servicio != "decoracion"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio decoracion'
        })
    }
//    //Verificar si está reservado
//    const existeFecha = await Decoracion.findOne({ fecha,salon,servicio });
//    if ( existeFecha ) {
//        return res.status(400).json({
//            msg: 'Esa fecha ya está apartada'
//        })
//    }
    //Guardar en BD
        await decoracion.save();
   
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            decoracion
    });
}
const usuariosDecoracionDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const decoracion = await Decoracion.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        msg: 'Solicitud DELETE a decoracion, controlador',
        decoracion
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,

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