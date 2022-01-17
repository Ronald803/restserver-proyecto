const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esSalonValido,                  esServicioValido,               esPlatoValido,          esGrupoValido,
        existeReservaSalonPorId,        existeReservaComidaPorId,       existeReservaMusicaPorId,       
        existeReservaBartenderPorId,    existeReservaDecoracionPorId,   existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,            usuariosPost,           usuariosPut,                usuariosDelete,
        usuariosSalonesGet,     usuariosSalonesPut,     usuariosSalonesPost,        usuariosSalonesDelete, 
        usuariosComidaGet,      usuariosComidaPut,      usuariosComidaPost,         usuariosComidaDelete,
        usuariosMusicaGet,      usuariosMusicaPut,      usuariosMusicaPost,         usuariosMusicaDelete, 
        usuariosBartenderGet,   usuariosBartenderPut,   usuariosBartenderPost,      usuariosBartenderDelete, 
        usuariosDecoracionGet,  usuariosDecoracionPut,  usuariosDecoracionPost,     usuariosDecoracionDelete} = require('../controllers/usuarios');

const router = Router();
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
const verificacionDatosUsuario = [
    check('nombreusuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('celular', 'El número de celular es obligatorio').not().isEmpty(),
    check('celular', 'El celular debe ser un numero').isDecimal(),    
    check('celular', 'El celular debe de ser más de 8 caracteres').isLength({min: 8}),
    check('contraseña', 'La contraseña debe de ser más de 6 caracteres').isLength({min: 6}),
    validarCampos
];
//////////////////////////////////Peticiones a Usuarios///////////////////////////////////////////////////////
router.get('/usuarios',   usuariosGet);
router.put('/usuarios/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosPut );
router.post('/usuarios', verificacionDatosUsuario, usuariosPost );
router.delete('/usuarios/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );
//////////////////////////////////Peticiones a Salones///////////////////////////////////////////////////////
router.get('/servicios/salones',   usuariosSalonesGet);
router.put('/servicios/salones/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaSalonPorId ),
    validarCampos
],usuariosSalonesPut );
router.post('/servicios/salones', verificacionDatos,usuariosSalonesPost );
router.delete('/servicios/salones/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaSalonPorId ),
    validarCampos
],usuariosSalonesDelete );
/////////////////////////////////Peticiones a Comida////////////////////////////////////////////////////////
router.get('/servicios/comida',   usuariosComidaGet);
router.put('/servicios/comida/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaComidaPorId ),
    validarCampos
],   usuariosComidaPut);
router.post('/servicios/comida', verificacionDatos,
check('plato').custom( esPlatoValido ),validarCampos,
usuariosComidaPost);
router.delete('/servicios/comida/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaComidaPorId ),
    validarCampos
],usuariosComidaDelete);
//////////////////////////////////Peticiones a Música////////////////////////////////////////////////////////
router.get('/servicios/musica',   usuariosMusicaGet);
router.put('/servicios/musica/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaMusicaPorId ),
    validarCampos     
], usuariosMusicaPut);
router.post('/servicios/musica', verificacionDatos, 
check('grupo').custom( esGrupoValido ),validarCampos,
usuariosMusicaPost);
router.delete('/servicios/musica/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaMusicaPorId ),
    validarCampos
],usuariosMusicaDelete);
//////////////////////////////////Peticiones a Bartender/////////////////////////////////////////////////////
router.get('/servicios/bartender',   usuariosBartenderGet);
router.put('/servicios/bartender/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaBartenderPorId ),
    validarCampos     
],   usuariosBartenderPut);
router.post('/servicios/bartender', verificacionDatos, 
    check('garzones','La cantidad de bartenders debe ser un número').isDecimal(),
    check('bartenderpro','La cantidad de bartenders debe ser un número').isDecimal(),
    validarCampos,
    usuariosBartenderPost);
router.delete('/servicios/bartender/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaBartenderPorId ),
    validarCampos
],usuariosBartenderDelete);
//////////////////////////////////Peticiones a Decoraciones////////////////////////////////////////////////////
router.get('/servicios/decoracion',   usuariosDecoracionGet);
router.put('/servicios/decoracion/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaDecoracionPorId ),
    validarCampos  
],   usuariosDecoracionPut);
router.post('/servicios/decoracion',  verificacionDatos, 
    check('flores','Flores debe ser un booleano').isBoolean(),
    check('centromesa','Centro de mesa debe ser booleano').isBoolean(),
    validarCampos,
    usuariosDecoracionPost);
router.delete('/servicios/decoracion/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaDecoracionPorId ),
    validarCampos
],usuariosDecoracionDelete);

module.exports = router;