const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController')


router.get('', controller.Index)
router.post('', controller.Create)



module.exports = router
