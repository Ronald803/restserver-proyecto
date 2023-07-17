const { response, request } = require('express');
const Salon = require('../models/salon');


const salonesGetAll = async (req=request,res=response) => {
    const salons = await Promise.all([ 
        Salon.find()
    ])
    res.json( salons );
}   

const salonesGet = async (req=request,res=response) => {
    const{fecha} = req.query;
    const [salons] = await Promise.all([
        Salon.find({fecha })
    ])
    res.json( salons );
}   
const salonesPut = async (req=request,res=response) => {
    const { id } = req.params;
    const {fecha,salon} = req.body;
    const auxsalon = await Salon.find({fecha,salon,caracteristica:"reservado"})
    if (auxsalon.length === 0){
        const sssalon = await Salon.findByIdAndUpdate( id, {fecha,salon} );
            res.json(sssalon);    
    } else{
        res.json({
            msg: `El salon ${salon} para la fecha ${fecha} ya fue reservado`
        })    
    }
}
const salonesPost = async (req=request,res=response) => {
    const {salon, servicio, caracteristica, evento, precio, fecha } = req.body;
    //_________________________ Verificar si el Post es a la base de datos del servicio correcto ______
    if ( servicio != "salones"){ 
        return res.status(400).json({
            msg: 'Peticion post debe ser a servicio salones'
        })
    }
    // ________________________________________________________________________________________________
    const nombreusuario = req.usuario.nombreusuario; 
    const nuevaReservaSalon = new Salon( {salon, servicio, caracteristica, evento, precio, fecha, nombreusuario} );
    
    //_________________________ Verificar si está reservado ___________________________________________
    const existeFecha = await Salon.findOne({ fecha,salon,servicio,caracteristica });
    if ( existeFecha ) {
        return res.status(400).json({
        msg: 'Esa fecha ya está apartada'
        })
    }  
    //_________________________ Guardar en BD _________________________________________________________
    await nuevaReservaSalon.save();

    res.json({
        msg: 'Solicitud POST a salones, controlador',
        nuevaReservaSalon, 
    });   
}
const salonesDelete = async (req=request,res=response) => {
    const {id} = req.params;
    const salon = await Salon.findByIdAndUpdate(id,{caracteristica:"eliminado"});
    res.json({
        salon
    });
}
module.exports = {
    salonesGetAll,
    salonesGet,
    salonesPost,
    salonesPut,
    salonesDelete,
}