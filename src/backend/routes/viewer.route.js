const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const MovieModel = require("../models/Movie");
const MovieController = require("../controllers/movie");
// TODO: Split into 2 routes, premium and free viewer
// TODO: Check authorization properly

router.get("/watch/:mv_id(\\d+)/:file_name(part(.m3u8|\\d+.ts))", async (req, res, next) => {
    const {mv_id, file_name} = req.params;
    if (mv_id !== undefined && file_name !== undefined) {
        try {
            const movie = await MovieModel.get(mv_id);
            if (movie == null) {
                res.status(400).send(`No movie with id ${mv_id} exist`);
            } else {
                if (await MovieController.can_watch(req.user, mv_id)) {
                    const video_path = path.join(MovieModel.get_folder(mv_id), file_name);
                    if (!fs.existsSync(video_path)) {
                        MovieController.stream(path.join(MovieModel.MOVIES_FOLDER, "default", file_name), res);
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
