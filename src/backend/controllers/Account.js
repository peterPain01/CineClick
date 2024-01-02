const AccountModel = require("../models/Account");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const saltround = 10;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();
const Utils = require("./Utils.js");
var jwt = require("jwt-simple");

module.exports = {
    async create(req, res, next) {
        const { email, password } = req.body;
        console.log(`[INFO] Register api call with for, email`);
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
                res.status(200).send("OK");
            }
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

                const encodedEmail = encodeURIComponent(email);
                const encodedToken = encodeURIComponent(token);
                let resetPasswordLink =  `http://127.0.0.1:5173/reset-password/${encodedEmail}/${encodedToken}`
                const shortenLink = await Utils.shortenLink(
                    resetPasswordLink,
                    process.env.BITLY
                )
                resetPasswordLink = shortenLink
                // TODO change hard url to .env
                const info = await sendEmail(
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
};

async function sendEmail(to, subject, resetPasswordLink) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    let htmlTemplate = "";
    const filePath = path.join(__dirname, "../views/recoverMail.html");
    try {
        htmlTemplate = fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.error("Read html err:", err.message);
    }

    const formattedHTML = htmlTemplate.replace(
        /{resetPasswordLink}/g,
        resetPasswordLink
    );
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        html: formattedHTML,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        } else {
            return info.response;
        }
    });
}
