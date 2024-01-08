const { isNumber, isArray } = require("util");
const db = require("../modules/Database");
const path = require("path");
const MOVIES_FOLDER = path.join("resources", "videos");
module.exports = {
    MOVIES_FOLDER,
    MovieInfo: class {
        constructor(obj) {
            if (obj.id !== undefined && !isNumber(obj.id)) throw new Error(`MovieInfo: ${obj.id} is not a valid id`);
            this.id = obj.id;
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
        const result = await db.exec('SELECT max(id) AS id FROM "Movie"');
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
    async list_movie_append_genres(condition) {
        let result = (await db.find("Movie", condition)).map(async mv => {
            return {
                ...mv,
                genres: (await this.list_genres(mv.id)),
            };
        });
        result = await Promise.all(result);
        return result;
    },
    async list(type, genres) {
        let condition = "";
        type = type?.trim();
        if (type !== undefined && type !== "") condition += ` type = '${type}'`;
        let result = await this.list_movie_append_genres(condition);
        if (genres !== undefined) {
            if (isArray(genres) && genres.length >= 1) {
                result = result.filter(mv => {
                    return genres.find(g => !mv.genres.includes(g.trim().toLowerCase())) === undefined;
                });
            } else if (typeof genres == "string") {
                result = result.filter(mv => {
                    return mv.genres.includes(genres.toLowerCase());
                });
            }
        }
        return result;
    },
    async all_genres() {
        return (await db.all("Genre")).map(x => x.genre);
    },
    async list_similars(mv_id) {
        return await db.exec(`
SELECT mv.*
FROM "Movie" mv JOIN "MovieSimilar" mvs ON mvs.similar_id = mv.id
WHERE mvs.mv_id = ${mv_id}
`);
    },
    async list_genres(mv_id) {
        return (await db.exec(`
SELECT genre
FROM "Genre" g JOIN "MovieGenre" mvg ON g.id = mvg.genre_id
WHERE mvg.mv_id = ${mv_id}
`)).map(x => x.genre);
    },
    async add(movie_info, genres) {
        if (!(movie_info instanceof this.MovieInfo)) {
            throw new Error("Can't insert object of different type than MovieInfo to 'Movie' table");
        }
        await db.helper_insert("Movie", movie_info);
        await this.add_genres(movie_info.id, genres);
    },
    async add_genres(mv_id, genres) {
        for (const g of genres || []) {
            await db.proc('add_genre', [mv_id, g.trim().toLowerCase()]);
        }
    },
    async remove(id) {
        console.log("OK");
        await db.conn_execute(async (conn) => {
            await conn.tx(async t => {
                await t.none(`DELETE FROM "MovieFavorite" WHERE movie = ${id}`);
                await t.none(`DELETE FROM "BoughtMovie" WHERE mv_id = ${id}`);
                await t.none(`DELETE FROM "PaidMovie" WHERE id = ${id}`);
                await t.none(`DELETE FROM "MovieGenre" WHERE mv_id = ${id}`);
                await t.none(`DELETE FROM "MovieSimilar" WHERE similar_id = ${id} OR mv_id = ${id}`);
                await t.none(`DELETE FROM "Movie" WHERE id = ${id}`);
            });
        });
    },
    async can_watch_paid_movie(email, id) {
        if (!id && !email) {
            throw new Error("'ID' and 'email' are required");
        }
        const result = await db.exec(`SELECT * FROM "BoughtMovie" WHERE email = '${email}' AND id = ${id}`);
        return result.length != 0;
    },
    async search(pattern, genres, sort_by, order) {
        const all_posible_sort = ["title", "imdb", "release"];
        let condition = `LOWER(title) LIKE LOWER('%${pattern.trim()}%')`;
        if (sort_by !== undefined && all_posible_sort.includes(sort_by.toLowerCase())) {
            condition += ` ORDER BY ${sort_by.toLowerCase()} ${["asc", "desc"].includes(order.toLowerCase()) ? order : "asc"}`;
        }
        let result = await this.list_movie_append_genres(condition);
        result = await Promise.all(result);
        if (genres !== undefined) {
            if (isArray(genres) && genres.length >= 1) {
                result = result.filter(mv => {
                    return genres.find(g => !mv.genres.includes(g.trim().toLowerCase())) === undefined;
                });
            } else if (typeof genres == "string") {
                result = result.filter(mv => {
                    return mv.genres.includes(genres.toLowerCase());
                });
            }
        }
        return result;
    }
}

