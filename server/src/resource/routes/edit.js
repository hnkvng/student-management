const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/editController');

router.put('/', Controllers.edit);

module.exports = router;
