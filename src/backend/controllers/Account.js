const AccountModel = require("../models/Account");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const saltround = 10;
module.exports = {
    async create(req, res, next) {
        const {username, password, email} = req.body;
        console.log(`[INFO] Register api call with for`, username);
        try {
            if (!username || !password || !email) {
                res.status(400).send("Missing one of username/password/email");
            } else if (await AccountModel.get(null, email) != null) {
                res.status(400).send("Email is already registered");
            } else if (await AccountModel.get(username) != null) {
                res.status(400).send("Username is already registered");
            } else {
                const encrypted_pass = await bcrypt.hash(password, saltround);
                await AccountModel.insert(new AccountModel.AccountInfo(email, username, encrypted_pass, "free-viewer"));
                await UserModel.insert(new UserModel.UserInfo(email, null, null));
                res.status(200).send("OK");
            }
        } catch (err) {
            next(err);
        }
    },
}
