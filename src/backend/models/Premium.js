const db = require("../modules/Database");

module.exports = {
    PremiumInfo: class {
        constructor(email, upgraded_date, expired) {
            if (!email || !upgraded_date || !expired) {
                throw new Error(`Missing some fields for PremiumInfo`);
            }
            this.email = email;
            // TODO validate Date
            this.upgraded_date = upgraded_date;
            this.expired = expired;
        }
    },

    async get(email) {
        const res = await db.get("PremiumInfo", `email = '${email}'`);
        if (res === undefined || res === null) {
            return null;
        } else {
            const { email, upgraded_date, expired } = res;
            return new this.PremiumInfo(email, upgraded_date, expired);
        }
    },

    async insert(pre_info) {
        if (!(pre_info instanceof this.PremiumInfo)) {
            throw new Error(
                "Can't insert object of different type than PremiumInfo to 'PremiumInfo' table"
            );
        } else {
            await db.helper_insert("PremiumInfo", pre_info);
        }
    },

    async update(email, expired) {
        try{
            await db.update(
                "PremiumInfo",
                ` email = '${email}'`,
                ` expired = '${expired}'`
            );
        }
        catch(err){
            throw err
        }
    },

    addMonthsToDate(dateString, monthsToAdd) {
        const dateObject = new Date(dateString);
        dateObject.setUTCMonth(dateObject.getUTCMonth() + monthsToAdd);
        const updatedDateString = dateObject.toISOString();
        return updatedDateString;
    },
};
