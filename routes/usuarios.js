const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole,tieneRole } = require('../middlewares/validar-roles');
const {
    validarCampos, verificacionDatosUsuario, verificacionDatos, validarJWT, esAdminRole, tieneRole} =require('../middlewares');

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
//////////////////////////////////Peticiones a Usuarios///////////////////////////////////////////////////////
router.get('/usuarios', [validarJWT, tieneRole('ADMINISTRADOR','MODERADOR')],  usuariosGet);
router.put('/usuarios/:id',[
    validarJWT, 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosPut );
router.post('/usuarios', verificacionDatosUsuario, usuariosPost );
router.delete('/usuarios/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );
//////////////////////////////////Peticiones a Salones///////////////////////////////////////////////////////
router.get('/servicios/salones', [validarJWT], usuariosSalonesGet);
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
router.get('/servicios/comida', [validarJWT], usuariosComidaGet);
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
router.get('/servicios/musica', [validarJWT], usuariosMusicaGet);
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
router.get('/servicios/bartender', [validarJWT], usuariosBartenderGet);
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
router.get('/servicios/decoracion', [validarJWT], usuariosDecoracionGet);
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