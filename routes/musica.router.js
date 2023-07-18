const { Router }        = require('express');
const { check }         = require('express-validator');
const musicaController  = require('../controllers/musica.controllers');
const {validarCampos, verificacionDatos, validarJWT, tieneRole} =require('../middlewares');
const { esGrupoValido, existeReservaMusicaPorId } = require('../helpers/db-validators');
const router = Router();

router.get('/all',musicaController.musicGetAll);
router.get('/',musicaController.musicaGetSpecific);
router.put('/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaMusicaPorId ),
    validarCampos     
], musicaController.musicaPut);
router.post('/',[validarJWT], verificacionDatos, 
check('grupo').custom( esGrupoValido ),validarCampos,musicaController.musicaPost);
router.delete('/:id',[
    validarJWT, tieneRole('ADMINISTRADOR','MODERADOR'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaMusicaPorId ),
    validarCampos
],musicaController.musicaDelete);

module.exports = router;