const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { esSalonValido, esServicioValido } = require('../helpers/db-validators');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

const verificacionDatosUsuario = [
    check('nombreusuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('celular', 'El número de celular es obligatorio').not().isEmpty(),
    check('celular', 'El celular debe ser un numero').isDecimal(),    
    check('celular', 'El celular debe de ser más de 8 caracteres').isLength({min: 8}),
    check('contraseña', 'La contraseña debe de ser más de 6 caracteres').isLength({min: 6}),
    validarCampos
];
const verificacionDatos = [
    check('salon', 'El salón es obligatorio').not().isEmpty(),
    check('nombreusuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('salon').custom( esSalonValido ),
    check('servicio').custom( esServicioValido ),
    check('fecha','No es una fecha correcta').isDate(),
    check('contraseña', 'La contraseña debe de ser más de 6 caracteres').isLength({min: 6}),
    check('precio', 'El precio debe ser un numero').isDecimal(),    
    validarCampos
];

module.exports = {
    validarCampos,verificacionDatosUsuario, verificacionDatos
}