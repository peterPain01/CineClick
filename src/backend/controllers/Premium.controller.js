const paypal = require("../config/paypal");
const PremiumModel = require("../models/Premium");
const AccountModel = require("../models/Account");
const PlanModel = require("../models/Plan");

module.exports = {
    async handleOrders(req, res) {
        try {
            const { cart } = req.body;
            console.log(cart);
            const { jsonResponse, httpStatusCode } = await paypal.createOrder(
                cart
            );
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to create order." });
        }
    },

    async handleCapture(req, res) {
        try {
            const { orderID } = req.params;
            const { jsonResponse, httpStatusCode } = await paypal.captureOrder(
                orderID
            );

            if (httpStatusCode === 201) {
                const { orderResponse, httpStatus } =
                    await paypal.getOrderDetails(orderID);
                const plan_id = orderResponse.purchase_units[0].description;
                console.log("plan_id", plan_id);
                const plan = await PlanModel.find(plan_id);
                console.log(plan);
                if (!plan) throw new Error("data base error");
                
                const month_add = plan[0].duration;
                console.log(month_add);
                const email = req.user.email;
                let transaction_date = new Date(
                    jsonResponse.purchase_units[0].payments.captures[0].create_time
                );
                let expired = new Date(
                    PremiumModel.addMonthsToDate(transaction_date, month_add)
                );
                const pre_info = await PremiumModel.get(email);
                if (!pre_info) {
                    await AccountModel.update_type(email, "premium-viewer");
                    await PremiumModel.insert(
                        new PremiumModel.PremiumInfo(
                            email,
                            transaction_date,
                            expired
                        )
                    );
                } else {
                    expired = new Date(pre_info.expired);
                    let current_date = new Date();
                    if (expired < current_date) expired = current_date;
                    else expired = new Date(pre_info.expired);
                    expired = PremiumModel.addMonthsToDate(expired, month_add);

                    await PremiumModel.update(email, expired);
                }
            }
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            res.status(500).json({ error: "Failed to capture order." });
        }
    },
};

// lay thong tin olan ghi vao database
// cap nhat thoi gian cho user. type account
// cap nhat 3 trang giao dien moi
