const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/homeController');

router.get('/', Controllers.show);

module.exports = router;
