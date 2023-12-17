const db = require("../modules/Database");

module.exports = {
    is_valid_type(type) {
        if (type !== 'admin' && type !== 'free-viewer' && type !== 'premium-viewer') {
            return false;
        }
        return true;
    },
    AccountInfo: class {
        constructor(email, username, password, type) {
            if (!email && !username) {
                throw new Error("Either 'email' or 'username' must be present for an account");
            }
            this.email = email;
            this.username = username;
            this.password = password;
            if (!module.exports.is_valid_type(type)) {
                throw new Error(`Invalid account type ${type}`);
            }
            this.type = type;
        }
    },
    // NOTE: Required either 'username' or 'email'
    // NOTE: 'type' is optional
    async get(username, email, type) {
        let condition = "";
        if (username) condition += ` username = '${username}'`;
        if (email) condition += ` email = '${email}'`;
        if (type) {
            if (!this.is_valid_type(type)) {
                throw new Error(`Unregconized type '${type}'`);
            }
            condition += ` type = '${type}'`;
        }
        let result = await db.get("account", condition);
        if (result == null) return null;
        const {email: n_email, username: n_username, password, type: n_type} = result;
        return new this.AccountInfo(n_email, n_username, password, n_type);
    },
    async insert(acc_info) {
        if (!(acc_info instanceof this.AccountInfo)) {
            throw new Error("Can't insert object of different type than AccountInfo to 'account' table");
        }
        await db.helper_insert("account", acc_info);
    }
};
