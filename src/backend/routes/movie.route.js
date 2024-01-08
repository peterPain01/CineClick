const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie");

router.get("/list-all", async (req, res) => {
    const genres = req.query.genres || [];
    const length = req.query.length;
    let movies = await MovieModel.list(null, genres);
    if (!isNaN(length)) movies = movies.slice(0, length);
    res.status(200).setHeader("Content-Type", "application/json").send(movies);
});

router.get("/list", async (req, res) => {
    const genres = req.query.genres || [];
    const page = isNaN(req.query.page) ? 1 : Number(req.query.page);
    const per_page = isNaN(req.query.per_page) ? 6 : Number(req.query.per_page);

    let movies = await MovieModel.list(null, genres);
    const total = movies.length;
    movies = movies.slice((page-1)*per_page, page*per_page);
    res.status(200)
       .setHeader("Content-Type", "application/json")
       .send({movies: movies, total_page: ((total/per_page) >> 0) + (total%per_page == 0 ? 0 : 1)});
});

router.get("/list-similar", async (req, res) => {
    const id = req.query.id || "";
    const movies = await MovieModel.list_similars(id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(movies));
});

router.get("/search", async (req, res) => {
    const pattern = req.query.pattern?.trim() || "";
    const genres = req.query.genres || [];
    const page = isNaN(req.query.page) ? 1 : Number(req.query.page);
    const per_page = isNaN(req.query.per_page) ? 6 : Number(req.query.per_page);
    const sort_by = req.query.sort_by || "title";
    const order = req.query.order || "asc";
    if (pattern === "") res.status(400).send("Missing pattern");
    else {
        let movies = await MovieModel.search(pattern, genres, sort_by, order);
        const total = movies.length;
        if (!isNaN(page)) movies = movies.slice((page-1)*per_page, page*per_page);
        res.status(200).setHeader("Content-Type", "application/json")
           .send({movies: movies, total_page: ((total/per_page) >> 0) + (total%per_page == 0 ? 0 : 1)});
    }
});

router.get("/daily-movie", async (req, res) => {
});

module.exports = router;
