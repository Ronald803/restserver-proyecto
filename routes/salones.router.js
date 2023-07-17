const { Router }        = require('express');
const { check }         = require('express-validator');
const controllerSalones = require('../controllers/salones.controllers')
const router            = Router();

const {
    validarCampos, verificacionDatos, validarJWT, tieneRole} =require('../middlewares');
const { existeReservaSalonPorId } = require('../helpers/db-validators');


router.get('/all', controllerSalones.salonesGetAll);
router.get('/',controllerSalones.salonesGet);
router.put('/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaSalonPorId ),
    validarCampos
],controllerSalones.salonesPut );
router.post('/', [validarJWT], verificacionDatos,controllerSalones.salonesPost );
router.delete('/:id',
                [
                    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
                    check('id', 'No es un ID válido').isMongoId(),
                    check('id').custom( existeReservaSalonPorId ),
                    validarCampos
                ],
                controllerSalones.salonesDelete
            );


module.exports = router;