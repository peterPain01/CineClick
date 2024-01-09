const db = require("../modules/Database");
const MovieModel = require("../models/Movie");
const Account = require("./Account");
module.exports = {
    UserInfo: class {
        constructor(email, name, avatar, age = 0, is_ban = false) {
            this.email = email;
            this.name = name;
            this.avatar = avatar;
            this.age = age;
            this.is_ban = is_ban;
        }
    },
    async get(email) {
        let result = await db.get("UserInfo", `email = '${email}'`);
        const {name, avatar, age, is_ban} = result;
        if (result == null) return null;
        return new this.UserInfo(email, name, avatar, age, is_ban);
    },
    async insert(user_info) {
        if (!(user_info instanceof this.UserInfo)) {
            throw new Error("Can't insert object of different type than UserInfo to 'UserInfo' table");
        }
        await db.helper_insert("UserInfo", user_info);
    },
    async is_fav(email, movie) {
        const res = await db.get("MovieFavorite", `email = '${email}' AND movie = ${movie}`);
        return res != null;
    },
    async set_fav(email, movie, fav) {
        if (fav.toLowerCase() === "true") {
            if (!(await this.is_fav(email, movie))) {
                await db.helper_insert("MovieFavorite", {email, movie});
            }
        } else await db.exec(`DELETE FROM "MovieFavorite" WHERE email = '${email}' AND movie = ${movie}`);
    },
    async list_fav(email) {
        const result = await db.exec(`SELECT mv.* FROM "MovieFavorite" mf JOIN "Movie" mv ON mf.movie = mv.id WHERE mf.email = '${email}'`);
        const promises = result.map(async x => {
            return {...x, genres: await MovieModel.list_genres(x.id)};
        });
        const temp = await Promise.all(promises);
        return temp;
    },
    async getAllAvatar(){
        try{
            const res = await db.all("avatar")
            return res
        }
        catch(err)
        {
            throw(err)
        }
    },

    async changeUserInfo(email, name, avatar){
        try{ 
            const data = await db.update("UserInfo",`email = '${email}'`, `avatar = '${avatar}', name = '${name}'`)
            return data
        }
        catch(err){
            throw err
        }
    },
    async list_users_with_type() {
        const promises = (await db.all("UserInfo")).map(async x => {
            return {
                ...x,
                type: (await Account.get(x.email)).type,
            }
        });
        return await Promise.all(promises);
    },
    async ban(email) {
        await db.exec(`UPDATE "UserInfo" SET is_ban = true WHERE email = '${email}'`);
    },
    async unban(email) {
        await db.exec(`UPDATE "UserInfo" SET is_ban = false WHERE email = '${email}'`);
    }
};
