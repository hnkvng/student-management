const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/deleteController');

router.delete('/', Controllers.delete);
router.delete('/all', Controllers.deleteAll);
router.delete('/classroom', Controllers.deleteClass);

module.exports = router;
