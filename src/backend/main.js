require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 13123;

// common middlewares
require("./config/passport")(app);

app.use(express.urlencoded({extended: true})); // parse json body
app.use(express.json());
app.use((req, res, next) => {
    if (req.headers.origin) res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// app.use((req, res, next) => {
//     console.log("[INFO]", req.path);
//     console.log("[INFO]", req.session);
//     console.log("[INFO]", req.isAuthenticated());
//     next();
// });
app.use("/views", express.static("views"));

app.use("/auth", require("./routes/auth.route"));
app.use("/admin", require("./routes/admin.route"));
app.use("/viewer", require("./routes/viewer.route"));

app.get("/", (req, res) => {
    res.redirect("/views/index.html");
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal server error");
});

app.listen(port, () => {
    require("./modules/Database").init_db();
    console.log(`[INFO] App start on port: ${port}`);
});
