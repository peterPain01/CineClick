const db = require("../modules/Database");

module.exports = {
    async find(p_id) {
        if (!p_id) throw new Error("Missing plan id");
        try {
            return await db.find("plan", `plan_id = '${p_id}'`);
        } catch (err) {
            throw err;
        }
    },

    async get_all() {
        try {
            return await db.all("plan");
        } catch (err) {
            throw err;
        }
    },
};
