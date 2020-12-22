/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usaurioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.get('/list', usaurioController.list);
router.post('/login', usaurioController.login);
router.put('/uptdate', usaurioController.update);

module.exports = router;