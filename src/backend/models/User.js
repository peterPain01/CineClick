const db = require("../modules/Database");
module.exports = {
    UserInfo: class {
        constructor(email, name, avatar) {
            this.email = email;
            this.name = name;
            this.avatar = avatar;
        }
    },
    async get(email) {
        let result = await db.get("UserInfo", `email = '${email}'`);
        const {name, avatar} = result;
        if (result == null) return null;
        return new this.UserInfo(email, name, avatar);
    },
    async insert(user_info) {
        if (!(user_info instanceof this.UserInfo)) {
            throw new Error("Can't insert object of different type than UserInfo to 'UserInfo' table");
        }
        await db.helper_insert("UserInfo", user_info);
    },
};
