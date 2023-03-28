const express = require('express');
const router = express.Router();
const controller = require('../controller/paymentMethodController')


router.get('', controller.Index)
router.post('', controller.Create)



module.exports = router
