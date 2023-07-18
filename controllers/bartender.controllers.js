const { response, request } = require('express');
const Bartender = require('../models/bartender');

const bartenderGetAll = async(req=request,res=response) => {
    const [bartender] = await Promise.all([ Bartender.find() ])
    res.json( bartender );
}
const bartenderGetSpecific = async(req=request,res=response) => {
    const{fecha} = req.query;
    const [bartender] = await Promise.all([ Bartender.find({fecha }) ])
    res.json( bartender );
}
const bartenderPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {bartenderpro,garzones,fecha,salon} = req.body;
    const bartender = await Bartender.findByIdAndUpdate( id, {fecha, salon, garzones, bartenderpro} );
    res.json(bartender);
}
const bartenderPost = async (req=request,res=response) => {
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
    res.json({bartender});
}
const bartenderDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const bartender = await Bartender.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({bartender});
}

module.exports = {
    bartenderGetAll,
    bartenderGetSpecific,
    bartenderPost,
    bartenderPut,
    bartenderDelete,
}