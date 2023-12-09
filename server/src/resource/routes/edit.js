const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/editController');

router.get('/', Controllers.show);
router.put('/', Controllers.edit);
module.exports = router;
