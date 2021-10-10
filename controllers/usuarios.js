const { response } = require('express');

const usuariosSalonesGet = (req,res=response) => {
    res.send('Solicitud GET a salones, controlador');
}
const usuariosSalonesPut = (req,res=response) => {
    res.send('Solicitud PUT a salones, controlador');
}
const usuariosSalonesPost = (req,res=response) => {
    res.send('Solicitud POST a salones, controlador');
}
const usuariosSalonesDelete = (req,res=response) => {
    res.send('Solicitud DELETE a salones, controlador')
}


const usuariosComidaGet = (req,res=response) => {
    res.send('Solicitud GET a comida, controlador');
}
const usuariosComidaPut = (req,res=response) => {
    res.send('Solicitud PUT a comida, controlador');
}
const usuariosComidaPost= (req,res=response) => {
    res.send('Solicitud POST a comida, controlador');
}
const usuariosComidaDelete = (req,res=response) => {
    res.send('Solicitud DELETE a comida, controlador');
}


const usuariosMusicaGet = (req,res=response) => {
    res.send('Solicitud GET a musica, controlador');
}
const usuariosMusicaPut = (req,res=response) => {
    res.send('Solicitud PUT a musica, controlador');
}
const usuariosMusicaPost = (req,res=response) => {
    res.send('Solicitud POST a musica, controlador');
}
const usuariosMusicaDelete = (req,res=response) => {
    res.send('Solicitud DELETE a musica, controlador');
}


const usuariosBartenderGet = (req,res=response) => {
    res.send('Solicitud GET a bartender, controlador');
}
const usuariosBartenderPut = (req,res=response) => {
    res.send('Solicitud PUT a bartender, controlador');
}
const usuariosBartenderPost = (req,res=response) => {
    res.send('Solicitud POST a bartender, controlador');
}
const usuariosBartenderDelete = (req,res=response) => {
    res.send('Solicitud DELETE a bartender, controlador');
}


const usuariosDecoracionesGet = (req,res=response) => {
    res.send('Solicitud GET a decoraciones, controlador');
}
const usuariosDecoracionesPut = (req,res=response) => {
    res.send('Solicitud PUT a decoraciones, controlador');
}
const usuariosDecoracionesPost = (req,res=response) => {
    res.send('Solicitud POST a decoraciones, controlador');
}
const usuariosDecoracionesDelete = (req,res=response) => {
    res.send('Solicitud DELETE a decoraciones, controlador');
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