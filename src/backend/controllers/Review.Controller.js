const db = require("../modules/Database");

module.exports = {
    ReviewMovie: class {
        constructor(email, review, stars) {
            if (!email || !review || !stars) {
                throw new Error("Some fields are empty");
            }
        }
    },
    async create(req, res, next) {
        const email = req.user.email;
        const { review, stars, mv_id } = req.body;
        if (!email || !review || !stars || !mv_id)
            res.status(400).send("Error occurred, wait a few minutes");
        try {
            const result = db.helper_insert("reviewmovie", {
                email,
                mv_id,
                review,
                stars,
            });
            if (!result) {
                res.status(500).send("Error occurred, wait a few minutes");
            }
            res.status(200).send("Thanks for your review ");
        } catch (err) {
            next(err);
        }
    },
    async getAll(req, res, next) {
        const mv_id = req.query.mv_id;
        if (!mv_id)
            res.status(400).send("mv_id occurred, wait a few minutes");
        try {
            const result = await db.find(
                "reviewmovie",
                `mv_id = '${mv_id}'`
            );
            if (!result) {
                res.status(500).send("Error occurred, wait a few minutes");
            }
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    },
};
