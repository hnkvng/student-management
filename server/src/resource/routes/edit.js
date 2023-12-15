const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/editController');

router.get('/', Controllers.show);
router.put('/', Controllers.editStudent);
router.put('/classroom', Controllers.editClass);

module.exports = router;
