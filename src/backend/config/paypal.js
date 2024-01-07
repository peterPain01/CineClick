const axios = require("axios");
require("dotenv").config;
const db = require("../modules/Database");
const fetch = require("node-fetch");

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const base = process.env.BASE_PAYPAL;

module.exports = {
    /**
     * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
     * @see https://developer.paypal.com/api/rest/authentication/
     */
    async generateAccessToken() {
        try {
            if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
                throw new Error("MISSING_API_CREDENTIALS");
            }
            const auth = Buffer.from(
                PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
            ).toString("base64");
            const response = await fetch(`${base}/v1/oauth2/token`, {
                method: "POST",
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            });

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error("Failed to generate Access Token:", error);
        }
    },

    /**
     * Capture payment for the created order to complete the transaction.
     * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
     */
    async captureOrder(orderID) {
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        });

        return this.handleResponse(response);
    },

    async handleResponse(response) {
        try {
            const jsonResponse = await response.json();
            return {
                jsonResponse,
                httpStatusCode: response.status,
            };
        } catch (err) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    },

    async getOrderDetails(orderID) {
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        try {
            const orderResponse = await response.json();
            return {
                orderResponse,
                httpStatus: response.status,
            };
        } catch (err) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    },
    async createOrder(cart) {
        // use the cart information passed from the fe to calculate the purchase unit details
        console.log(
            "shopping cart information passed from the frontend createOrder() callback:",
            cart
        );

        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const plan = await db.find("plan", `plan_id = '${cart[0].id}'`);
        const price = Math.ceil(Number(plan[0].price));
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: price,
                    },
                    description: cart[0].id,
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        });
        return this.handleResponse(response);
    },
};
