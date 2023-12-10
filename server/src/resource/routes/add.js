const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/addController');

router.post('/', Controllers.AddController.add);

module.exports = router;
