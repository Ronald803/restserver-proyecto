const { Router } = require('express');
const { check } = require('express-validator');

const {usuariosSalonesGet,usuariosSalonesPut,usuariosSalonesPost,usuariosSalonesDelete} = require('../controllers/usuarios')
const {
    validarCampos, verificacionDatos, validarJWT, tieneRole} =require('../middlewares');
const { existeReservaSalonPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/servicios/salones', usuariosSalonesGet);
router.put('/servicios/salones/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaSalonPorId ),
    validarCampos
],usuariosSalonesPut );
router.post('/servicios/salones', [validarJWT], verificacionDatos,usuariosSalonesPost );
router.delete('/servicios/salones/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaSalonPorId ),
    validarCampos
],usuariosSalonesDelete );


module.exports = router;