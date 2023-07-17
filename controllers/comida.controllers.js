const { response, request } = require('express');
const Comida                = require( '../models/comida');

const comidaGetAll = async (req=request,res=response) => {
    const [comidas] = await Promise.all([Comida.find()])
    res.json(
        comidas
    );
}
const comidaGetSpecific = async (req=request,res=response) => {
    const{fecha} = req.query;
    const [comidas] = await Promise.all([ Comida.find({fecha }) ])
    res.json(
        comidas
    );
}
const comidaPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {fecha,salon,plato,invitados} = req.body;
    const comida = await Comida.findByIdAndUpdate( id, {fecha,salon,plato,invitados} );
    res.json(comida);
}
const comidaPost= async(req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, plato, invitados, precio, fecha } = req.body;
    const nombreusuario = req.usuario.nombreusuario;
    const comida = new Comida( {salon, servicio, caracteristica, evento, plato, invitados, precio, fecha, nombreusuario} );
    //___________________________________   Verificar si el Post es a la base de datos del servicio correcto ________________
    if ( servicio != "comida"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio comida'
        })
    }
    //___________________________________    Guardar en BD ___________________________________________________________________
    await comida.save();
    res.json({comida});    
}
const comidaDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const comida = await Comida.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({comida});
}

module.exports = {
    comidaGetAll,
    comidaGetSpecific,
    comidaPost,
    comidaPut,
    comidaDelete,
}