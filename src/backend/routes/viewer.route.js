const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserController = require("../controllers/User.controller");
const AccountController= require('../controllers/Account')
const bcrypt = require("bcrypt");
const Account = require("../models/Account");
const MovieController = require("../controllers/movie");

// TODO: Split into 2 routes, premium and free viewer
// TODO: Check authorization properly

router.get("/watch/:mv_id(\\d+)/:file_name(part(.m3u8|\\d+.ts))", UserController.watch);
router.get("/can-watch", async (req, res, next) => {
    try {
        const {mv_id} = req.query;
        if (mv_id === undefined) res.status(400).send("Missing movie id");
        const result = await MovieController.can_watch(req.user, mv_id);
        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
});
router.get("/set-favorite", async (req, res, next) => {
    const {mv_id, fav} = req.query;
    if (mv_id === undefined || fav === undefined) res.status(400).send("Missing arguments");
    else {
        await User.set_fav(req.user?.email, mv_id, fav);
        res.status(200).send("OK");
    }
});
router.get("/is-favorite", async (req, res, next) => {
    const {mv_id} = req.query;
    if (mv_id === undefined) res.status(400).send("Missing movie id");
    else {
        res.status(200).send(await User.is_fav(req.user?.email, mv_id));
    }
});
router.get("/list-favorite", async (req, res, next) => {
    const page = isNaN(req.query.page) ? 1 : Number(req.query.page);
    const per_page = isNaN(req.query.per_page) ? 6 : Number(req.query.per_page);
    let movies = await User.list_fav(req.user?.email) || [];
    const total = movies.length;

    console.log(page, per_page);

    movies = movies.slice((page-1)*per_page, page*per_page);
    res.status(200)
       .setHeader("Content-Type", "application/json")
       .send({movies: movies, total_page: ((total/per_page) >> 0) + (total%per_page == 0 ? 0 : 1)});
});

router.post("/change-pass", async (req, res, next) => {
    const {new_pass} = req.body;
    if (new_pass === undefined || new_pass === "") res.status(400).send("Missing new password");
    try {
        await Account.update(req.user?.email, bcrypt.hashSync(new_pass, 10));
    } catch(err) {
        next(err);
    }
    res.status(200).send("OK");
});

// router to get user info 
// send Email và plan của user
// Plan: premium or free 
// các gói chia theo đăng ký dài hạn (càng lâu càng rẻ)
router.get("/profile", AccountController.getAccountInfo)
module.exports = router;
