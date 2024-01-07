require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 13123;

// common middlewares
require("./config/passport")(app);

app.use(express.urlencoded({extended: true})); // parse json body
app.use(express.json());
app.use((req, res, next) => {
    cors({
        origin: req.headers.origin,
        methods: "post, get",
        allowedHeaders: "Content-Type",
        credentials: true,
    })(req, res, next);
});
app.use((req, res, next) => {
    console.log("[INFO]", req.path);
    console.log("[INFO]", req.session);
    next();
});
app.use("/views", express.static("views"));

app.get("/", (req, res) => {
    res.redirect("/views/index.html");
});

app.use("/auth", require("./routes/auth.route"));

app.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).send("Unauthenticated user");
    } else {
        next();
    }
});
app.use("/admin", require("./routes/admin.route"));
app.use("/viewer", require("./routes/viewer.route"));
app.use("/movie", require("./routes/movie.route"));
app.use('/plan', require('./routes/plan.route'))
app.use('/premium', require('./routes/premium.route'))
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal server error");
});

app.listen(port, () => {
    require("./modules/Database").init_db();
    console.log(`[INFO] App start on port: ${port}`);
});
