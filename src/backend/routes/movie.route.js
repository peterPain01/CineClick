const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie");

router.get("/list", async (req, res) => {
    const genres = req.query.genres || [];
    const movies = await MovieModel.list(null, genres);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(movies));
});

module.exports = router;
