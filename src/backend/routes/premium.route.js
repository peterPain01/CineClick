const express = require("express");
const router = express.Router();
const PremiumController = require('../controllers/Premium.controller')

router.post("/orders", PremiumController.handleOrders)
router.post("/orders/:orderID/capture", PremiumController.handleCapture)

module.exports = router