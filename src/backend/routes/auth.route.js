const express = require("express");
const AccountController = require("../controllers/Account");
const router = express.Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", {
    failureRedirect: "/auth/login_fail",
    failureMessage: true,
    scope: ["profile", "email"],
}), (req, res) => {
    res.status(200).send({age: false, type: req.user.type});
});

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    console.log(req.user);
    // res.status(200).send("HELLO WORLD");
    res.redirect("http://localhost:5173/");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login_fail",
    failureMessage: true,
}), (req, res) => {
    if (req.body.remember === "true") {
        console.log(`[INFO] Remember ${req.user} for 10 minutes`);
        const max_age = 10 * 60 * 1000;
        req.session.cookie.maxAge = max_age; // remember for 10 minutes
        res.status(200).send({age: max_age, type: req.user.type});
    } else {
        req.session.cookie.expires = false; // only for current client (delete when browser close)
        res.status(200).send({age: false, type: req.user.type});
    }
});

router.post("/register", AccountController.create);
router.get("/logout", (req, res, next) => {
    if (req.user === undefined) {
        res.status(400).send("User is not logged in");
    } else {
        req.logout({}, (err) => {
            if (err) {
                next(err);
            } else {
                res.status(200).send("OK");
            }
        });
    }
});

router.get("/login_fail", (req, res, next) => {
    // TODO: Handle login failure properly
    let msg = req.session.messages?.length ? req.session.messages.pop() : "Failed to log in";
    res.status(400).send(msg);
});

module.exports = router;
