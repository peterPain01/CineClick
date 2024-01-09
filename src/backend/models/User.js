const db = require("../modules/Database");
const MovieModel = require("../models/Movie");
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
       try{
        const result = await db.exec(`SELECT mv.* FROM "MovieFavorite" mf JOIN "Movie" mv ON mf.movie = mv.id WHERE mf.email = '${email}'`);
        const promises = result.map(async x => {
            return {...x, genres: await MovieModel.list_genres(x.id)};
        });
        const temp = await Promise.all(promises);
        return temp;
       }
       catch(err){
        throw err
       }
    },
};
