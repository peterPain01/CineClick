const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie");

router.get("/list", async (req, res) => {
    const length = req.query.length;
    const genres = req.query.genres || [];
    const page = req.query.page;
    const per_page = req.query.per_page || 10;

    let movies = await MovieModel.list(null, genres);
    if (!isNaN(length)) movies = movies.slice(0, length);
    if (!isNaN(page)) movies = movies.slice((page-1)*per_page, page*per_page);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(movies));
});

router.get("/list-similar", async (req, res) => {
    const id = req.query.id || "";
    const movies = await MovieModel.list_similars(id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(movies));
});

router.get("/daily-movie", async (req, res) => {
});

module.exports = router;
