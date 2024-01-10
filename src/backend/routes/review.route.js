const express = require("express");
const router = express.Router();
const ReviewController = require('../controllers/Review.Controller')

router.post('/create', ReviewController.create)
router.get('/list-all', ReviewController.getAll)
module.exports = router;