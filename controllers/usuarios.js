const { response } = require('express');
const Usuario = require( '../models/usuario' );


const usuariosSalonesGet = (req=request,res=response) => {
    const {salon, fecha, usuario} = req.query;
    res.json({
        msg: 'Solicitud GET a salones, controlador',
        salon, fecha, usuario
    });
}
const usuariosSalonesPut = (req=request,res=response) => {
    const {golden , platinum} = req.body;
    res.json({
        msg: 'Solicitud PUT a salones, controlador',
        golden, platinum 
    });
}
const usuariosSalonesPost = async (req=request,res=response) => {
    const body = req.body;
    const usuario = new Usuario(body);
    
    await usuario.save();


    res.json({
        msg: 'Solicitud POST a salones, controlador',
        usuario, 
    });   
}
const usuariosSalonesDelete = (req=request,res=response) => {
    const {golden , platinum} = req.body;
    res.json({
        msg: 'Solicitud DELETE a salones, controlador',
        golden, platinum 
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
const usuariosComidaPost= (req=request,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a comida, controlador',
            golden, platinum, externo
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