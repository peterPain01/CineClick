const AccountModel = require("../models/Account");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const saltround = 10;
const crypto = require("crypto");

const dotenv = require("dotenv");

dotenv.config();

const Utils = require("./Utils.js");
var jwt = require("jwt-simple");

module.exports = {
    async create(req, res, next) {
        const { email, password } = req.body;
        console.log("[INFO] Register api call with for, email");
        try {
            if (!email || !password) {
                res.status(400).send("Missing one of password/email");
            } else if ((await AccountModel.get(email)) != null) {
                res.status(400).send("Email is already registered");
            } else {
                const encrypted_pass = await bcrypt.hash(password, saltround);
                await AccountModel.insert(
                    new AccountModel.AccountInfo(
                        email,
                        encrypted_pass,
                        "free-viewer"
                    )
                );
                await UserModel.insert(
                    new UserModel.UserInfo(email, null, null)
                );
                // payment
                res.status(200).send("OK");
            }
        } catch (err) {
            next(err);
        }
    },

    async getAllAvatar(req, res, next) {
        try {
            const data = await UserModel.getAllAvatar();
            if (!data) {
                res.status(500).send("Internal Server, please try again");
            }
            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
    async resetPassword(req, res, next) {
        const { email, token, password } = req.body;
        if (!password || typeof password !== "string") {
            res.status(400).send("Error occurred ! Please try again");
        }
        try {
            const acc = await AccountModel.get(email);
            if (acc) {
                let secret = acc.password + "-" + acc.email;
                let payload = "";
                try {
                    payload = await jwt.decode(token, secret);
                } catch (err) {
                    res.status(400).send(
                        "That link expired! Please send another request to get new link"
                    );
                }
                const encrypted_pass = await bcrypt.hash(password, saltround);
                const result = await AccountModel.update(email, encrypted_pass);
                if (result == null) {
                    res.status(500).send(
                        "Update password failed ! Please try again"
                    );
                }
                res.status(200).send("Reset Password Successfully");
            } else {
                res.status(404).send("Email not found");
            }
        } catch (err) {
            next(err);
        }
    },

    async getUserInfo(req, res, next) {
        const email = req.user.email;
        try {
            if (!email) {
                res.status(400).send(
                    "Can't detect your email, please try again"
                );
            } else {
                const userInfo = await UserModel.get(email);
                if (!userInfo)
                    res.status(400).send("User not found in Database");
                else {
                    res.status(200).send(
                        new UserModel.UserInfo(
                            userInfo.email,
                            userInfo.name,
                            userInfo.avatar
                        )
                    );
                }
            }
        } catch (err) {
            next(err);
        }
    },

    async getAccountInfo(req, res, next) {
        const email = req.user.email;
        try {
            if (!email) {
                res.status(400).send(
                    "Can't detect your email, please try again"
                );
            } else {
                const info = await AccountModel.get(email);
                if (!info) res.status(400).send("Email not found in Database");
                else {
                    const type = info.type;
                    res.status(200).send({ email, type });
                }
            }
        } catch (err) {
            next(err);
        }
    },

    async changeUserInfo(req, res, next) {
        const email = req.user.email;
        const { name, avatar } = req.body;
        if(!email){
            res.status(400).send("Not Found your email, Please try again")
        }
        try {
            const data = await UserModel.changeUserInfo(email, name, avatar);
            if(!data){
                res.status(500).send("Internal Server, Please try again")
            }
            res.status(200).send("Change Your Info Successful")
        } catch (err) {
            next(err);
        }
    },

    async sendMailActive(req, res, next) {
        const { email } = req.body;

        try {
            const acc = await AccountModel.get(email);
            if (acc) {
                var payload = {
                    email: email,
                };
                var secret = acc.password + "-" + acc.email;
                var token = jwt.encode(payload, secret);

                const encodedEmail = btoa(email);
                const encodedToken = btoa(token);
                let resetPasswordLink = `http://localhost:5173/reset-password/${encodedEmail}/${encodedToken}`
                // const shortenLink = await Utils.shortenLink(
                //     resetPasswordLink,
                //     process.env.BITLY
                // )
                // resetPasswordLink = shortenLink
                const info = await Utils.sendEmail(
                    email,
                    "Reset Password",
                    resetPasswordLink
                );
                res.status(200).send(
                    "Check your email for instructions to reset your password."
                );
            } else {
                res.status(404).send("Email not found");
            }
        } catch (err) {
            next(err);
        }
    },
};