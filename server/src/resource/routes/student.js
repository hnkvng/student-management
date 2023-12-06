const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/studentController');

router.get('/', Controllers.show);

module.exports = router;
