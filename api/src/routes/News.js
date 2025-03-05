const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getNews, postNews, getNewsId, putNews, deleteNews, getNewsByCategory} = require('../Controllers/News')

const router = Router();

router.get('/', getNews)
router.get('/:id', getNewsId)
router.get('/?title={title}')
router.get('/?name={name}')
router.post('/crear/:userId', postNews)
router.put('/:id', putNews)
router.delete('/:id', deleteNews)
router.get('/category/:id', getNewsByCategory)
module.exports = router;