const { isNumber } = require("util");
const db = require("../modules/Database");
const path = require("path");
const MOVIES_FOLDER = path.join("resources", "videos");
module.exports = {
    MOVIES_FOLDER,
    MovieInfo: class {
        constructor(title, release, imdb, directors, genres, type, id) {
            this.title = title;
            this.release = release;
            this.imdb = imdb;
            this.directors = directors;
            this.genres = genres;
            this.type = type;
            if (id !== undefined && !isNumber(id)) throw new Error(`MovieInfo: ${id} is not a valid id`);
            this.id = id;
        }
    },
    get_folder(id) {
        if (id === undefined) {
            throw new Error("Can't get path of a movie without id");
        }
        return path.join(MOVIES_FOLDER, id.toString());
    },
    get_file(id) {
        return path.join(this.get_folder(id), "part.m3u8");
    },

    async get_next_id() {
        const result = await db.exec("SELECT max(id) as id FROM movie");
        const id = Number(result[0].id || -1) + 1;
        return id;
    },

    async get(id) {
        id = Number(id);
        if (id === undefined || id === null || !isNumber(id)) {
            throw new Error(`[Movie get error] Invalid id ${id}`);
        }
        const result = await db.get("movie", `id = ${id}`);
        if (result == null) return null;
        return result;
    },

    // NOTE: type and genre are optional
    async list(type, genre) {
        let condition = "";
        if (type) condition += ` type = '${type}'`;
        if (genre) condition += ` genres like '%${genre}%'`;
        return await db.find("movie", condition);
    },
    async add(movie_info) {
        if (!(movie_info instanceof this.MovieInfo)) {
            throw new Error("Can't insert object of different type than MovieInfo to 'movie' table");
        }
        await db.helper_insert("movie", movie_info);
        // let id = 0;
        // const {title, release, imdb, actors, directors, genres, type} = movie_info;
        // await db.conn_execute(async (conn) => {
        //     id = await conn.one('INSERT INTO movie VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING id', [
        //         title, release, imdb, actors, directors, genres, type
        //     ], c => +c.id);
        // });
        // console.log(id);
        // return id;
    }
}
