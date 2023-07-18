const { Router }            = require('express');
const { check }             = require('express-validator');
const bartenderController   = require('../controllers/bartender.controllers');
const { validarCampos, verificacionDatos, validarJWT, tieneRole} =require('../middlewares');
const { existeReservaBartenderPorId } = require('../helpers/db-validators');
const router = Router();

router.get('/all', bartenderController.bartenderGetAll);
router.get('/', bartenderController.bartenderGetSpecific);
router.put('/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaBartenderPorId ),
    validarCampos     
], bartenderController.bartenderPut);
router.post('/',[validarJWT], verificacionDatos, 
    check('garzones','La cantidad de bartenders debe ser un número').isDecimal(),
    check('bartenderpro','La cantidad de bartenders debe ser un número').isDecimal(),
    validarCampos,bartenderController.bartenderPost);
router.delete('/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaBartenderPorId ),
    validarCampos
],bartenderController.bartenderDelete);

module.exports = router;