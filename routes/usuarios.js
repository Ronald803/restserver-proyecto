const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esSalonValido, esServicioValido, existeReservaPorId } = require('../helpers/db-validators');

const { usuariosSalonesGet,     usuariosSalonesPut,     usuariosSalonesPost,        usuariosSalonesDelete, 
        usuariosComidaGet,      usuariosComidaPut,      usuariosComidaPost,         usuariosComidaDelete,
        usuariosMusicaGet,      usuariosMusicaPut,      usuariosMusicaPost,         usuariosMusicaDelete, 
        usuariosBartenderGet,   usuariosBartenderPut,   usuariosBartenderPost,      usuariosBartenderDelete, 
        usuariosDecoracionesGet,usuariosDecoracionesPut,usuariosDecoracionesPost,   usuariosDecoracionesDelete} = require('../controllers/usuarios');
////////////////////////////////////////////
/////////////Peticiones a Salones///////////
////////////////////////////////////////////
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
router.put('/comida',   usuariosComidaPut);
router.post('/comida', verificacionDatos, usuariosComidaPost);
router.delete('/comida',usuariosComidaDelete);
////////////////////////////////////////////
/////////////Peticiones a Música////////////
////////////////////////////////////////////
router.get('/musica',   usuariosMusicaGet);
router.put('/musica',   usuariosMusicaPut);
router.post('/musica',  usuariosMusicaPost);
router.delete('/musica',usuariosMusicaDelete);
////////////////////////////////////////////
/////////////Peticiones a Bartender/////////
////////////////////////////////////////////
router.get('/bartender',   usuariosBartenderGet);
router.put('/bartender',   usuariosBartenderPut);
router.post('/bartender',  usuariosBartenderPost);
router.delete('/bartender',usuariosBartenderDelete);
////////////////////////////////////////////
///////////Peticiones a Decoraciones////////
////////////////////////////////////////////
router.get('/decoraciones',   usuariosDecoracionesGet);
router.put('/decoraciones',   usuariosDecoracionesPut);
router.post('/decoraciones',  usuariosDecoracionesPost);
router.delete('/decoraciones',usuariosDecoracionesDelete);

module.exports = router;