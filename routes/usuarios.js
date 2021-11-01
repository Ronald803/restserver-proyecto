const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esSalonValido, esServicioValido, existeReservaPorId, 
    existeReservaComidaPorId, existeReservaMusicaPorId, 
    existeReservaBartenderPorId, existeReservaDecoracionPorId } = require('../helpers/db-validators');

const { usuariosSalonesGet,     usuariosSalonesPut,     usuariosSalonesPost,        usuariosSalonesDelete, 
        usuariosComidaGet,      usuariosComidaPut,      usuariosComidaPost,         usuariosComidaDelete,
        usuariosMusicaGet,      usuariosMusicaPut,      usuariosMusicaPost,         usuariosMusicaDelete, 
        usuariosBartenderGet,   usuariosBartenderPut,   usuariosBartenderPost,      usuariosBartenderDelete, 
        usuariosDecoracionGet,usuariosDecoracionPut,usuariosDecoracionPost,   usuariosDecoracionDelete} = require('../controllers/usuarios');

const router = Router();
const verificacionDatos = [
    check('salon', 'El salón es obligatorio').not().isEmpty(),
    check('salon').custom( esSalonValido ),
    check('servicio').custom( esServicioValido ),
    check('fecha','No es una fecha correcta').isDate(),
    check('contraseña', 'La contraseña debe de ser más de 6 caracteres').isLength({min: 6}),
    check('precio', 'El precio debe ser un numero').isDecimal(),    
    validarCampos
];
////////////////////////////////////////////
/////////////Peticiones a Salones///////////
////////////////////////////////////////////
router.get('/salones',   usuariosSalonesGet);
router.put('/salones/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaPorId ),
    validarCampos
],usuariosSalonesPut );
router.post('/salones', verificacionDatos,usuariosSalonesPost );
router.delete('/salones/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaPorId ),
    validarCampos
],usuariosSalonesDelete );
////////////////////////////////////////////
/////////////Peticiones a Comida////////////
////////////////////////////////////////////
router.get('/comida',   usuariosComidaGet);
router.put('/comida/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaComidaPorId ),
    validarCampos
],   usuariosComidaPut);
router.post('/comida', verificacionDatos, usuariosComidaPost);
router.delete('/comida',usuariosComidaDelete);
////////////////////////////////////////////
/////////////Peticiones a Música////////////
////////////////////////////////////////////
router.get('/musica',   usuariosMusicaGet);
router.put('/musica/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaMusicaPorId ),
    validarCampos     
], usuariosMusicaPut);
router.post('/musica', verificacionDatos, usuariosMusicaPost);
router.delete('/musica',usuariosMusicaDelete);
////////////////////////////////////////////
/////////////Peticiones a Bartender/////////
////////////////////////////////////////////
router.get('/bartender',   usuariosBartenderGet);
router.put('/bartender/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaBartenderPorId ),
    validarCampos     
],   usuariosBartenderPut);
router.post('/bartender', verificacionDatos, usuariosBartenderPost);
router.delete('/bartender',usuariosBartenderDelete);
////////////////////////////////////////////
///////////Peticiones a Decoraciones////////
////////////////////////////////////////////
router.get('/decoracion',   usuariosDecoracionGet);
router.put('/decoracion/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaDecoracionPorId ),
    validarCampos  
],   usuariosDecoracionPut);
router.post('/decoracion',  verificacionDatos, usuariosDecoracionPost);
router.delete('/decoracion',usuariosDecoracionDelete);

module.exports = router;