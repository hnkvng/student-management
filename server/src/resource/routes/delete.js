const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/deleteController');

router.delete('/', Controllers.delete);
router.delete('/classroom', Controllers.deleteClass);

module.exports = router;
