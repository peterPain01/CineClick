const express = require("express");
const router = express.Router();
const PlanController = require('../controllers/Plan.controller')

router.get('/', PlanController.getAllPlanInfo)
router.get('/info', PlanController.getPlan)

module.exports = router