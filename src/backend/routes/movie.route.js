const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie");

router.get("/list", async (req, res) => {
    const length = req.query.length;
    const genres = req.query.genres || [];
    const page = Number(req.query.page);
    const per_page = Number(req.query.per_page) || 10;
    let movies = await MovieModel.list(null, genres);
    if (length) movies = movies.slice(0, length);
    else if (page !== undefined && page !== null) movies = movies.slice((page-1)*per_page, page*per_page);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(movies));
});

router.get("/list-similar", async (req, res) => {
    const id = req.query.id || "";
    const movies = await MovieModel.list_similars(id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(movies));
});

module.exports = router;
