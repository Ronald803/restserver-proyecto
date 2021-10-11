const { response } = require('express');

const usuariosSalonesGet = (req,res=response) => {
    res.json({
        msg: 'Solicitud GET a salones, controlador',
    });
}
const usuariosSalonesPut = (req,res=response) => {
    const {golden , platinum} = req.body;
    res.json({
        msg: 'Solicitud PUT a salones, controlador',
        golden, platinum 
    });
}
const usuariosSalonesPost = (req,res=response) => {
    const {golden , platinum} = req.body;
    res.json({
        msg: 'Solicitud POST a salones, controlador',
        golden, platinum 
    });   
}
const usuariosSalonesDelete = (req,res=response) => {
    const {golden , platinum} = req.body;
    res.json({
        msg: 'Solicitud DELETE a salones, controlador',
        golden, platinum 
    });
}


const usuariosComidaGet = (req,res=response) => {
    res.json({
            msg: 'Solicitud GET a comida, controlador',
    });
}
const usuariosComidaPut = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a comida, controlador',
            golden, platinum, externo
    });
}
const usuariosComidaPost= (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a comida, controlador',
            golden, platinum, externo
    });
}
const usuariosComidaDelete = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a comida, controlador',
            golden, platinum, externo
    });
}


const usuariosMusicaGet = (req,res=response) => {
    res.json({
            msg: 'Solicitud GET a musica, controlador',
    });
}
const usuariosMusicaPut = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a musica, controlador',
            golden, platinum, externo
    });
}
const usuariosMusicaPost = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a musica, controlador',
            golden, platinum, externo
    });
}
const usuariosMusicaDelete = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a musica, controlador',
            golden, platinum, externo
    });
}


const usuariosBartenderGet = (req,res=response) => {
    res.json({
            msg: 'Solicitud GET a bartender, controlador',
    });
}
const usuariosBartenderPut = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a bartender, controlador',
            golden, platinum, externo
    });
}
const usuariosBartenderPost = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a bartender, controlador',
            golden, platinum, externo
    });
}
const usuariosBartenderDelete = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud DELETE a bartender, controlador',
            golden, platinum, externo
    });
}


const usuariosDecoracionesGet = (req,res=response) => {
    res.json({
            msg: 'Solicitud GET a decoraciones, controlador',
    });
}
const usuariosDecoracionesPut = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud PUT a decoraciones, controlador',
            golden, platinum, externo
    });
}
const usuariosDecoracionesPost = (req,res=response) => {
    const { golden, platinum, externo } = req.body;
    res.json({
            msg: 'Solicitud POST a decoraciones, controlador',
            golden, platinum, externo
    });
}
const usuariosDecoracionesDelete = (req,res=response) => {
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