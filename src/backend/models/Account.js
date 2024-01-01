const db = require("../modules/Database");

module.exports = {
    is_valid_type(type) {
        if (
            type !== "admin" &&
            type !== "free-viewer" &&
            type !== "premium-viewer"
        ) {
            return false;
        }
        return true;
    },
    AccountInfo: class {
        constructor(email, password, type) {
            if (!email) {
                throw new Error("'email' must be present for an account");
            }
            this.email = email;
            this.password = password;
            if (!module.exports.is_valid_type(type)) {
                throw new Error(Invalid account type ${type});
            }
            this.type = type;
        }
    },
    // NOTE: 'type' is optional
    async get(email, type) {
        let condition = "";
        if (email) condition +=  email = '${email}';
        else throw new Error("Email is missing");
        if (type) {
            if (!this.is_valid_type(type)) {
                throw new Error(Unregconized type '${type}');
            }
            condition +=  type = '${type}';
        }
        let result = await db.get("Account", condition);
        if (result == null) return null;
        {
            const { email, password, type } = result;
            return new this.AccountInfo(email, password, type);
        }
    },
    async insert(acc_info) {
        if (!(acc_info instanceof this.AccountInfo)) {
            throw new Error(
                "Can't insert object of different type than AccountInfo to 'Account' table"
            );
        }
        await db.helper_insert("Account", acc_info);
    },

    async update(email, password) {
        let condition = "";
        let update = "";
        if (email) condition +=  email = '${email}';
        else throw new Error("Email is missing");
        if (password) {
            update +=  password = '${password}';
        }else throw new Error("Password is missing");
        
        let result = await db.update("Account", condition, update);
        return result
    },
};