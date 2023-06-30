const express = require('express');
const controller = require('../controller/ctrl');
const router = express.Router();

router.get('/', controller.psql);
router.get('/psqlGet', controller.psqlGet);
router.post('/psqlPost', controller.psqlPost);
router.put('/psqlPut', controller.psqlPut);
router.delete('/psqlDel', controller.psqlDel);

module.exports = router