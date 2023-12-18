const AccountModel = require("../models/Account");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const saltround = 10;
module.exports = {
    async create(req, res, next) {
        const {email, password} = req.body;
        console.log(`[INFO] Register api call with for`, email);
        try {
            if (!email || !password) {
                res.status(400).send("Missing one of password/email");
            } else if (await AccountModel.get(email) != null) {
                res.status(400).send("Email is already registered");
            } else {
                const encrypted_pass = await bcrypt.hash(password, saltround);
                await AccountModel.insert(new AccountModel.AccountInfo(email, encrypted_pass, "free-viewer"));
                await UserModel.insert(new UserModel.UserInfo(email, null, null));
                res.status(200).send("OK");
            }
        } catch (err) {
            next(err);
        }
    },
}
