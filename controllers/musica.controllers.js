const { response, request } = require('express');

const Musica = require('../models/musica');

const musicGetAll = async(req=request,res=response)=>{
    const [musica] = await Promise.all([ Musica.find() ]);
    res.json(musica);
}
const musicaGetSpecific = async (req=request,res=response) => {
    const{fecha} = req.query;
    const [musica] = await Promise.all([ Musica.find({fecha }) ]);
    res.json(musica);
}
const musicaPut = async (req=request,res=response) => {
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
const musicaPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, grupo, precio, fecha} = req.body;
    const nombreusuario = req.usuario.nombreusuario;
    const musica = new Musica( {salon, servicio, caracteristica, evento, grupo, precio, fecha, nombreusuario} );
    if ( servicio != "musica"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio musica'
        })
    }
    //______________________ Verificar si está reservado_____________
    const existeFecha = await Musica.findOne({ fecha,grupo,servicio });
    if ( existeFecha ) {
        return res.status(400).json({
            msg: 'Esa fecha ya está apartada'
        })
    }
    //______________________ Guardar en BD __________________________
        await musica.save();
    res.json({ musica });
}
const musicaDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const musica = await Musica.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({musica});
}

module.exports = {
    musicGetAll,
    musicaGetSpecific,
    musicaPost,
    musicaPut,
    musicaDelete,
}