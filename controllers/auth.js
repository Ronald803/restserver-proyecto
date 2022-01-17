
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario')

const login = async (req, res = response) =>{

    const { correo, contraseña } = req.body;
    
    try{
        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - correo'
            });
        }

        //verificar si el usuario está activo
        if ( usuario.caracteristica === "eliminado"){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos - caracteristica:eliminado'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(contraseña, usuario.contraseña);
        if ( !validPassword ){
            return res.status(400).json({
                msg: "Usuario / contraseña no son correctos - contraseña"
            });
        }
        //generar jwt
        const token = await generarJWT( usuario.id ); 


        res.json({
            msg: 'Login ok',
            usuario,
            token
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}


module.exports  = {
    login
}