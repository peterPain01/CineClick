const express = require("express");
const path = require("path");
const router = express.Router();
const MovieController = require("../controllers/movie");
const { MovieInfo } = require("../models/Movie");
const uploader = require("multer")({dest: "raw-movies"});
// TODO: Split into 2 routes, premium and free viewer
// TODO: Check authorization properly
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthenticated admin");
    } else if (req.user.type !== "admin") {
        res.status(401).send("Unauthorized admin");
    } else {
        next();
    }
});

router.post("/upload-movie", uploader.single("file"), async (req, res, next) => {
    try {
        const info = new MovieInfo(req.body);
        await MovieController.add(info, req.file?.path);
        res.status(200).send("OK");
    } catch (err) {
        next(err);
    }
});

module.exports = router;

