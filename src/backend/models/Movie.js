const { isNumber, isArray } = require("util");
const db = require("../modules/Database");
const path = require("path");
const MOVIES_FOLDER = path.join("resources", "videos");
module.exports = {
    MOVIES_FOLDER,
    MovieInfo: class {
        constructor(obj) {
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
            this.thumbnail = obj.thumbnail;
            this.trailer = obj.trailer;
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
        const result = await db.get("Movie", `id = ${id}`);
        if (result == null) return null;
        const movie = new this.MovieInfo(result);
        movie.genres = await this.list_genres(result.id);
        return movie;
    },

    // NOTE: type and genre are optional
    async list_movie_append_genres(condition) {
        let result = (await db.find("Movie", condition)).map(async mv => {
            return {
                ...new this.MovieInfo(mv),
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
        return (await db.exec(`SELECT * FROM "Genre" ORDER BY genre ASC`)).map(x => x.genre);
    },
    async list_similars(mv_id) {
        let result = (await db.exec(`
SELECT mv.*
FROM "Movie" mv JOIN "MovieSimilar" mvs ON mvs.similar_id = mv.id
WHERE mvs.mv_id = ${mv_id}`)).map(async mv => {
                return {
                    ...new this.MovieInfo(mv),
                    genres: (await this.list_genres(mv.id)),
                };
            });
        result = await Promise.all(result);
        return result;
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
                await t.none(`DELETE FROM "MovieGenre" WHERE mv_id = ${id}`);
                await t.none(`DELETE FROM "MovieSimilar" WHERE similar_id = ${id} OR mv_id = ${id}`);
                await t.none(`DELETE FROM "Movie" WHERE id = ${id}`);
            });
        });
    },
    async search(pattern, include_genres, exclude_genres, sort_by, order) {
        const all_posible_sort = ["title", "imdb", "release"];
        let condition = `LOWER(title) LIKE LOWER('%${pattern.trim()}%')`;
        if (sort_by !== undefined && all_posible_sort.includes(sort_by.toLowerCase())) {
            condition += ` ORDER BY ${sort_by.toLowerCase()} ${["asc", "desc"].includes(order.toLowerCase()) ? order : "asc"}`;
        }
        let result = await this.list_movie_append_genres(condition);
        result = await Promise.all(result);
        if (include_genres !== undefined) {
            if (isArray(include_genres) && include_genres.length >= 1) {
                result = result.filter(mv => {
                    return include_genres.find(g => !mv.genres.includes(g.trim().toLowerCase())) === undefined;
                });
            } else if (typeof include_genres == "string") {
                result = result.filter(mv => {
                    return mv.genres.includes(include_genres.toLowerCase());
                });
            }
        }
        if (exclude_genres !== undefined) {
            if (isArray(exclude_genres) && exclude_genres.length >= 1) {
                result = result.filter(mv => {
                    return exclude_genres.find(g => mv.genres.includes(g.trim().toLowerCase())) === undefined;
                });
            } else if (typeof exclude_genres == "string") {
                result = result.filter(mv => {
                    return !mv.genres.includes(exclude_genres.toLowerCase());
                });
            }
        }
        return result;
    },
    async get_first() {
        const result = await db.proc("one", `SELECT * FROM "Movie" ORDER BY id ASC LIMIT 1`);
        if (result == null) return null;
        const mv = new this.MovieInfo(result);
        mv.genres = await this.list_genres(result.id);
        return mv;
    }
}

