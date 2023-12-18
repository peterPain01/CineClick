const { isNumber, isArray } = require("util");
const db = require("../modules/Database");
const path = require("path");
const MOVIES_FOLDER = path.join("resources", "videos");
module.exports = {
    MOVIES_FOLDER,
    MovieInfo: class {
        constructor(obj) {
            if (obj.id !== undefined && !isNumber(obj.id)) throw new Error(`MovieInfo: ${obj.id} is not a valid id`);
            this.title = obj.title || "";
            this.release = obj.release;
            this.imdb = obj.imdb;
            this.actors = obj.actors;
            this.directors = obj.directors;
            this.summary = obj.summary;
            this.image = obj.image;
            this.type = obj.type;
            this.length = obj.length;
            this.restrict_age = obj.restrict_age;
            this.year = obj.year;
            this.id = obj.id;
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
        const result = await db.exec('"ELECT max(id) AS id FROM "Movie"');
        const id = Number(result[0].id || 0) + 1;
        return id;
    },

    async get(id) {
        id = Number(id);
        if (id === undefined || id === null || !isNumber(id)) {
            throw new Error(`[Movie get error] Invalid id ${id}`);
        }
        const result = await db.get("Movie", `id = ${id}`);
        if (result == null) return null;
        return result;
    },

    // NOTE: type and genre are optional
    async list(type, genres) {
        let condition = "";
        type = type?.trim();
        if (type !== undefined && type !== "") condition += ` type = '${type}'`;
        let result = await (await db.find("Movie", condition)).map(async mv => {
            const mv_genres = (await this.list_genres(mv.id)).map(x => x.genre);;
            return {
                ...mv,
                genres: mv_genres,
            };
        });
        await Promise.all(result).then(x => {
            result = x;
        });
        if (genres !== undefined) {
            if (isArray(genres) && genres.length >= 1) {
                result = result.filter(mv => {
                    return genres.find(g => !mv.genres.includes(g.trim())) === undefined;
                });
            } else if (typeof genres == "string") {
                result = result.filter(mv => {
                    return mv.genres.includes(genres);
                });
            }
        }
        return result;
    },
    async all_genres() {
        return (await db.all("Genre")).map(x => x.genre);
    },
    async list_genres(mv_id) {
        return await db.exec(`
SELECT genre
FROM "Genre" g JOIN "MovieGenre" mvg ON g.id = mvg.genre_id
WHERE mvg.mv_id = ${mv_id}
`);
    },
    async add(movie_info) {
        if (!(movie_info instanceof this.MovieInfo)) {
            throw new Error("Can't insert object of different type than MovieInfo to 'Movie' table");
        }
        await db.helper_insert("Movie", movie_info);
        // let id = 0;
        // const {title, release, imdb, actors, directors, genres, type} = movie_info;
        // await db.conn_execute(async (conn) => {
        //     id = await conn.one('INSERT INTO movie VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING id', [
        //         title, release, imdb, actors, directors, genres, type
        //     ], c => +c.id);
        // });
        // console.log(id);
        // return id;
    },
    async can_watch_paid_movie(email, id) {
        if (!id && !email) {
            throw new Error("'ID' and 'email' are required");
        }
        const result = await db.exec(`SELECT * FROM "BoughtMovie" WHERE email = '${email}' AND id = ${id}`);
        return result.length != 0;
    }
}
