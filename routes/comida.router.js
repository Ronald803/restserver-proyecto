const { Router }        = require('express');
const router            = Router();
const { check }         = require('express-validator');
const comidaController  = require('../controllers/comida.controllers')
const {validarCampos, verificacionDatos, validarJWT, tieneRole} =require('../middlewares');
const { esPlatoValido, existeReservaComidaPorId} = require('../helpers/db-validators');

router.get('/all',comidaController.comidaGetAll);
router.get('/', comidaController.comidaGetSpecific);
router.put('/:id',  [
                        validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
                        check('id', 'No es un ID válido').isMongoId(),
                        check('id').custom( existeReservaComidaPorId ),
                        validarCampos
                    ],
                    comidaController.comidaPut);
router.post('/', [validarJWT], verificacionDatos, check('plato').custom( esPlatoValido ),validarCampos,comidaController.comidaPost);
router.delete('/:id',   [
                            validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
                            check('id', 'No es un ID válido').isMongoId(),
                            check('id').custom( existeReservaComidaPorId ),
                            validarCampos
                        ],
                    comidaController.comidaDelete);

module.exports = router;