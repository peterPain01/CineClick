const axios = require('axios');
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

module.exports = {
    async shortenLink(originalUrl, accessToken) {
        const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    
        try {
            const response = await axios.post(apiUrl, {
                long_url: originalUrl,
                domain: 'bit.ly', // Optional: Specify the domain
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            return response.data.id;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Bitly API error:', error.response.data);
            } else {
                console.error('Error making Bitly API request:', error.message);
            }
            throw error;
        }
    },

    async sendEmail(to, subject, resetPasswordLink) {
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
    
}