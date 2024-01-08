const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const MovieController = require("../controllers/movie");
const MovieModel = require("../models/Movie");
const { MovieInfo } = require("../models/Movie");
const uploader = require("multer")({dest: "raw-files"});
// TODO: Split into 2 routes, premium and free viewer
// TODO: Check authorization properly
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthenticated admin");
    } else if (req.user.type !== "admin") {
        res.status(401).send("Unauthorized admin");
    } else next();
});
router.get("/delete-movie", async (req, res, next) => {
    const id = Number(req.query.id);
    console.log("[INFO] Remove movie with id = " +  id);
    if (!isNaN(id)) {
        await MovieModel.remove(id);
        res.status(200).send("OK");
    } else {
        res.status(400).send("Missing id");
    }
});
router.post("/upload-movie",
    uploader.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
    async (req, res, next) => {
    try {
        const genres = req.body.genres?.split(",").map(x => x.trim()) || [];
        const info = new MovieInfo(req.body);
        const image_path = req.files?.picture?.at(0)?.path;
        const video_path = req.files?.video?.at(0)?.path;
        if (!video_path) {
            res.status(400).send("Missing video");
        } else if (!info.title) {
            res.status(400).send("Missing title");
        } else {
            await MovieController.add(info, genres, video_path, image_path);
            res.status(200).send("OK");
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

