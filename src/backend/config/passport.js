const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const AccountModel = require("../models/Account");
const UserModel = require("../models/User");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { AccountInfo } = require("../models/Account");
const { UserInfo } = require("../models/User");

passport.serializeUser((acc, done) => {
    console.log("Serialize", acc);
    if (!acc.email) {
        done("[ERROR] serialize: Invalid usage, required email");
    } else {
        done(null, acc.email);
    }
});
passport.deserializeUser(async (email, done) => {
    try {
        const acc = await AccountModel.get(email);
        if (!acc) {
            done("Can't find account with email " + email, false);
        } else {
            done(null, acc);
        }
    } catch(err) {
        throw err;
    }
});

module.exports = (app) => {
    app.use(session({
        secret: "SECRET",
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    }, async (access_token, refresh_token, profile, done) => {
        profile = profile._json; // easier to process
        if (!profile.email) {
            done("[ERROR] Invalid usage, required email");
        } else {
            try {
                let acc = await AccountModel.get(profile.email);
                if (acc) {
                    if (acc.type !== "admin"  && (await UserModel.get(acc.email)).is_ban) {
                        done(null, false, "Account is banned");
                    } else done(null, acc);
                } else {
                    acc = new AccountInfo(profile.email, null, "free-viewer");
                    AccountModel.insert(acc);
                    UserModel.insert(new UserInfo(profile.email, profile.name, profile.picture));
                    done(null, acc);
                }
            } catch (err) {
                console.log(err);
                done("[ERROR] Internal server error");
            }
        }
    }));

    passport.use(new LocalStrategy(async (email, password, done) => {
        if (!email) email = "";
        if (!password) password = "";
        try {
            const acc = await AccountModel.get(email);
            if (acc && bcrypt.compareSync(password, acc.password)) {
                if (acc.type !== "admin" && (await UserModel.get(acc.email)).is_ban) {
                    done(null, false, {message: "Account is banned"});
                } else done(null, acc);
            } else {
                done(null, false, {message: "Invalid email or password"});
            }
        } catch(err) {
            console.log(err);
            done("Internal server error", null);
        }
    }));
}
