const PlanModel = require('../models/Plan')

module.exports = { 
    async getPlan(req, res, next) {
        const p_id = req.query.p_id;
        if (!p_id) res.status(400).send("Not found plan");
        try {
            const plan = await PlanModel.find(p_id);
            if (!plan) res.status(400).send("Not found plan");
            else {
                res.status(200).send(plan);
            }
        } catch (err) {
            next(err);
        }
    },

    async getAllPlanInfo(req, res, next) {
        try {
            const plans = await PlanModel.get_all();
            if (!plans)
                res.status(500).send(
                    "Error occurred in Server, please try again"
                );
            res.status(200).send(plans);
        } catch (err) {
            next(err);
        }
    }, 
}