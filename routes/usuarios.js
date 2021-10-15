const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosSalonesGet, usuariosSalonesPut, usuariosSalonesPost, usuariosSalonesDelete, 
    usuariosComidaGet, usuariosComidaPut, usuariosComidaPost, usuariosComidaDelete,
    usuariosMusicaGet, usuariosMusicaPut, usuariosMusicaPost, usuariosMusicaDelete, 
    usuariosBartenderGet, usuariosBartenderPut, usuariosBartenderPost, usuariosBartenderDelete, 
    usuariosDecoracionesGet, usuariosDecoracionesPut, usuariosDecoracionesPost, usuariosDecoracionesDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/salones',   usuariosSalonesGet);
router.put('/salones',   usuariosSalonesPut );
router.post('/salones', [
    check('salon', 'El salón es obligatorio').not().isEmpty(),
    check('salon', 'No es un salón válido').isIn(['golden','platinum','otro']),
    check('servicio','El servicio no es válido').isIn(['salon','comida','musica','decoracion','bartender']),
    check('fecha','No es una fecha correcta').isDate(),
    check('contraseña', 'La contraseña debe de ser más de 6 caracteres').isLength({min: 6}),
    check('precio', 'El precio debe ser un numero').isDecimal(),    
    validarCampos
],usuariosSalonesPost );
router.delete('/salones',usuariosSalonesDelete );



router.get('/comida',   usuariosComidaGet);
router.put('/comida',   usuariosComidaPut);
router.post('/comida',  usuariosComidaPost);
router.delete('/comida',usuariosComidaDelete);


router.get('/musica',   usuariosMusicaGet);
router.put('/musica',   usuariosMusicaPut);
router.post('/musica',  usuariosMusicaPost);
router.delete('/musica',usuariosMusicaDelete);



router.get('/bartender',   usuariosBartenderGet);
router.put('/bartender',   usuariosBartenderPut);
router.post('/bartender',  usuariosBartenderPost);
router.delete('/bartender',usuariosBartenderDelete);


router.get('/decoraciones',   usuariosDecoracionesGet);
router.put('/decoraciones',   usuariosDecoracionesPut);
router.post('/decoraciones',  usuariosDecoracionesPost);
router.delete('/decoraciones',usuariosDecoracionesDelete);

module.exports = router;