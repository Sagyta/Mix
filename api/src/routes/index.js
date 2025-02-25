const { Router } = require('express');

const newRoute = require('./News')
const commentRoute=require('./Comments')
const user = require('./User');
const admin = require('./Admin')
const category = require('./Category');

const router = Router();


router.use('/user', user)
router.use('/news', newRoute)
router.use('/comment', commentRoute)
router.use('/admin', admin)
router.use('/category', category)

module.exports = router;