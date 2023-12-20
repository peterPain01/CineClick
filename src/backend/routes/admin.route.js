const express = require("express");
const path = require("path");
const router = express.Router();
const MovieController = require("../controllers/movie");
const MovieModel = require("../models/Movie");
const { MovieInfo } = require("../models/Movie");
const uploader = require("multer")({dest: "raw-movies"});
// TODO: Split into 2 routes, premium and free viewer
// TODO: Check authorization properly
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthenticated admin");
    } else if (req.user.type !== "admin") {
        res.status(401).send("Unauthorized admin");
router.get("/delete-movie", uploader.single("video"), async (req, res, next) => {
    const id = Number(req.query.id);
    console.log("[INFO] Remove movie with id = " +  id);
    if (id !== undefined && id !== null) {
        await MovieModel.remove(id);
        res.status(200).send("OK");
    } else {
        res.status(400).send("Missing id");
    }
});
router.post("/upload-movie", uploader.single("video"), async (req, res, next) => {
    try {
        const genres = req.body.genres?.split(",").map(x => x.trim());
        const info = new MovieInfo(req.body);
        if (!req.file?.path) {
            res.status(400).send("Missing video");
        } else if (!info.title) {
            res.status(400).send("Missing title");
        } else {
            await MovieController.add(info, req.file.path, genres);
            res.status(200).send("OK");
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

