const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const MovieController = require("../controllers/movie");
const MovieModel = require("../models/Movie");
const UserModel = require("../models/User");
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

router.get("/list-viewers", async (req, res, next) => {
    const page = isNaN(req.query.page) ? 1 : Number(req.query.page);
    const per_page = isNaN(req.query.per_page) ? 10 : Number(req.query.per_page);
    try {
        let viewers = await UserModel.list_users_with_type();
        const total = viewers.length;
        viewers = viewers.slice((page-1)*per_page, page*per_page);
        res.status(200).setHeader("Content-Type", "application/json").send({
            viewers,
            total_page: ((total/per_page) >> 0) + (total%per_page == 0 ? 0 : 1),
        });
    } catch(err) {
        next(err);
    }
});

router.post("/update-ban", async (req, res, next) => {
    try {
        const {email, ban} = req.body;
        console.log(email, ban);
        if (email === undefined || ban === undefined) res.status(400).send("Missing arguments");
        else {
            if (ban) await UserModel.ban(email);
            else await UserModel.unban(email);
            res.status(200).send("OK");
        }
    } catch(err) {
        next(err);
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
        if (!info.title) {
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

