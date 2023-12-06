const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/addController');

router.post('/', Controllers.add);

module.exports = router;
