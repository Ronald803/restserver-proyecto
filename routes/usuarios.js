const { Router } = require('express');
const { usuariosSalonesGet, usuariosSalonesPut, usuariosSalonesPost, usuariosSalonesDelete, 
    usuariosComidaGet, usuariosComidaPut, usuariosComidaPost, usuariosComidaDelete,
    usuariosMusicaGet, usuariosMusicaPut, usuariosMusicaPost, usuariosMusicaDelete, 
    usuariosBartenderGet, usuariosBartenderPut, usuariosBartenderPost, usuariosBartenderDelete, 
    usuariosDecoracionesGet, usuariosDecoracionesPut, usuariosDecoracionesPost, usuariosDecoracionesDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/salones',   usuariosSalonesGet);
router.put('/salones',   usuariosSalonesPut );
router.post('/salones',  usuariosSalonesPost );
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