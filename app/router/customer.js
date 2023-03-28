const express = require('express');
const router = express.Router();
const controller = require('../controller/customerController')


router.get('', controller.Index)
router.post('', controller.Create)



module.exports = router
