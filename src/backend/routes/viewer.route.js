const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const MovieModel = require("../models/Movie");
const MovieController = require("../controllers/movie");
// TODO: Split into 2 routes, premium and free viewer
// TODO: Check authorization properly
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthenticated user can't watch movies");
    } else if (req.user.type !== "free-viewer" && req.user.type !== "premium-viewer") {
        res.status(401).send("Only viewer can access this route");
    } else {
        next();
    }
});

// TODO: refactor below code to controller ?
router.get("/list-movies", async (req, res, next) => {
    if (req.user?.type === "free-viewer") {
        const movies = await MovieModel.list("free");
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(movies));
    } else {
        next(new Error("[Viewer route][list-movies][not free-viewer]: Unimplemented"));
    }
});

router.get("/watch/:mv_id(\\d+)/:file_name(part(.m3u8|\\d+.ts))", async (req, res, next) => {
    console.log(req.path);
    const {mv_id, file_name} = req.params;
    if (mv_id !== undefined && file_name !== undefined) {
        try {
            // TODO: Rethink how watch api work
            // TODO: implement movie controller 'can watch' and use it
            const movie = await MovieModel.get(mv_id);
            if (movie == null) {
                res.status(400).send(`No movie with id ${mv_id} exist`);
            } else {
                if (movie.type === "free") {
                    const video_path = path.join(MovieModel.get_folder(mv_id), file_name);
                    if (!fs.existsSync(video_path)) {
                        // TODO: send a pseudo video in this case ???
                        res.status(400).send("No data for video with id=" + mv_id);
                    } else {
                        MovieController.stream(video_path, res);
                    }
                } else {
                    res.status(401).send("Unauthorized to watch movie");
                }
            }
        } catch (err) {
            next(err);
        }
    } else {
        res.status(400).send("Viewer watch error");
    }
});

module.exports = router;
