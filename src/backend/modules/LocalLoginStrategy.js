const AccountModel = require("../models/Account");
const passport = require("passport");
const bcrypt = require("bcrypt");
const PassportStrategy = require("passport-strategy").Strategy;
const saltround = 10;

module.exports = {
    Strategy: class extends PassportStrategy {
        constructor(name) {
            super();
            this.name = name;
            passport.strategies[name] = this;
        }
        async authenticate(req, options) {
        }
    }
}
