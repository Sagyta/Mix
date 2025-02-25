const { Router } = require('express');
const {getCategory, postCategory, getCategoryId, putCategory, deleteCategory} = require('../Controllers/Category')

const router = Router();

router.get('/', getCategory)
router.get('/:id', getCategoryId)
router.post('/', postCategory)
router.put('/:id', putCategory)
router.delete('/:id', deleteCategory)
module.exports = router;