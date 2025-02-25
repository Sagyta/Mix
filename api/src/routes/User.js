const { Router } = require('express');
const {getUser, postUser, getConfirm, getUserId, putUser, deleteUser} = require('../Controllers/User')

const router = Router();

router.get('/', getUser)
router.get('/:id', getUserId)
router.post('/', postUser)
router.get('/confirm/:token', getConfirm)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)
module.exports = router;