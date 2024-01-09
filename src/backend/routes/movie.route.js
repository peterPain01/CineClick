const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const MovieModel = require("../models/Movie");
const MovieController = require("../controllers/movie");

router.get("/list-all", async (req, res) => {
    const genres = req.query.genres !== "" ? req.query.genres?.split(",")?.map(x => x.trim()) : [];
    const length = req.query.length;
    let movies = await MovieModel.list(null, genres);
    if (!isNaN(length)) movies = movies.slice(0, length);
    res.status(200).setHeader("Content-Type", "application/json").send(movies);
});

router.get("/list", async (req, res) => {
    const genres = req.query.genres !== "" ? req.query.genres?.split(",")?.map(x => x.trim()) : [];
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
    res.status(200).send(movies);
});

router.get("/list-all-genres", async (req, res, next) => {
    try {
        const genres = await MovieModel.all_genres();
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(genres);
    } catch(err) {
        next(err);
    }
});

router.get("/search", async (req, res) => {
    const pattern = req.query.pattern?.trim() || "";
    const include = req.query.include_genres !== "" ? req.query.include_genres.split(",").map(x => x.trim()) : [];
    const exclude = req.query.exclude_genres !== "" ? req.query.exclude_genres.split(",").map(x => x.trim()) : [];
    const page = isNaN(req.query.page) ? 1 : Number(req.query.page);
    const per_page = isNaN(req.query.per_page) ? 6 : Number(req.query.per_page);
    const sort_by = req.query.sort_by || "title";
    const order = req.query.order || "asc";
    let movies = await MovieModel.search(pattern, include, exclude, sort_by, order);
    const total = movies.length;
    if (!isNaN(page)) movies = movies.slice((page-1)*per_page, page*per_page);
    res.status(200).setHeader("Content-Type", "application/json")
       .send({movies: movies, total_page: ((total/per_page) >> 0) + (total%per_page == 0 ? 0 : 1)});
});

router.get("/daily-movie", async (req, res, next) => {
    try {
        const result = await MovieModel.get_first();
        res.status(200).setHeader("Content-Type", "application/json").send(result);
    } catch(err) {
        next(err);
    }
});
router.get("/trailer/:file_name", (req, res, next) => {
    console.log(req.path);
    const {file_name} = req.params;
    var range = req.headers.range // bytes=0-1
    const file_path = path.join(__dirname, "..", "resources", "trailers", file_name);
    const data = fs.readFileSync(file_path);
    if (!range) {
        res.writeHead(200, {
            "Content-Type": "application/x-mpegURL",
            "X-UA-Compatible": "IE=edge;chrome=1",
            'Content-Length': data.length
        });
        res.end(data)
    } else {
        var total = data.length,
            split = range.split(/[-=]/),
            ini = +split[1],
            end = split[2]?+split[2]:total-1,
            chunkSize = end - ini + 1
        res.writeHead(206, { 
            "Content-Range": "bytes " + ini + "-" + end + "/" + total, 
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "application/x-mpegURL",
        })
        res.end(data.slice(ini, chunkSize+ini))
    }
});
// router.get("/trailer/:file_name", (req, res, next) => {
//     const {file_name} = req.params;
//     console.log(file_name);
//     const file_path = path.join("resources", "trailers", file_name);
//     if (fs.existsSync(file_path)) {
//         MovieController.stream(file_path, res);
//     } else {
//         res.status(404).send("File not found");
//     }
// });

module.exports = router;
