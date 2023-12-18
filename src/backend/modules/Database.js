const fs = require("fs");
const data = require("../data.json");
const pgp = require("pg-promise")({
    capSQL: true,
});
const DB_NAME = "cineclick";

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: DB_NAME,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    max: 30,
};
const cineclick_db = pgp(cn);
module.exports = {
    async init_db() {
        let conn = null;
        try {
            const root = pgp({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                password: process.env.DB_PASS,
                user: process.env.DB_USER,
                max: 30,
            });
            conn = await root.connect();
            const result = await conn.query(`SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`);
            if (result.length == 0) { // no db founddb
                console.log("[INFO] No database 'cineclick' found, create one from 'init.sql'");
                await conn.any(`CREATE DATABASE ${DB_NAME}`);
                await conn.done();
                conn = await cineclick_db.connect();
                await conn.none(fs.readFileSync("./init.sql", {encoding: "utf-8"}));
                const ids = {};
                let promises= data.Movies.map(async mv => {
                    await conn.tx(async t => {
                        const directors = mv.directorList?.map(y => {
                            return data.Names.find(z => z.id === y)?.name || null;
                        }).filter(y => y !== null);
                        const actors = mv.actorList?.map(y => {
                            return data.Names.find(z => z.id === y.id)?.name || null;
                        }).filter(y => y !== null);
                        const rand = Math.random();
                        const movie = {
                            title: mv.title?.trim() || "",
                            image: mv.image?.trim() || "",
                            release: mv.releaseDate,
                            length: mv.runtimeStr?.trim() || "",
                            imdb: Number(mv.imDbRating) || 0,
                            summary: mv.plot?.trim() || "",
                            directors: directors?.join(", ") || "",
                            actors: actors?.join(", ") || "",
                            type: rand > 0.5 ? "free" : "premium",
                            restrict_age: rand <= 1/3 ? "18+" : rand <= 2/3 ? "13+" : "9+",
                            year: mv.year || "",
                        };
                        const sql = pgp.helpers.insert(movie, null, "Movie") + " RETURNING id"
                        const id = await t.one(sql, null, c => +c.id);
                        ids[mv.id] = id;
                        for (const g of mv.genreList || []) {
                            await t.proc('add_genre', [id, g.trim()]);
                        }
                    });
                });
                await Promise.all(promises);
                promises = data.Movies.map(async mv => {
                    await Promise.all(mv.similars.map(async id => {
                        if (mv.id && id && ids[mv.id] && ids[id]) {
                            const sql = pgp.helpers.insert({mv_id: ids[mv.id], similar_id: ids[id]}, null, "MovieSimilar");
                            await conn.none(sql);
                        }
                    }));
                });
                await Promise.all(promises);
            } else {
                console.log("[INFO] Database 'cineclick' found");
            }
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.done();
        }
    },
    async exec(sql) {
        let conn = null;
        try {
            conn = await cineclick_db.connect();
            return await conn.any(sql);
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.done();
        }
    },
    async all(tb_name) {
        return this.exec(`select * from "${tb_name}"`);
    },
    async find(tb_name, condition) {
        condition = condition.trim();
        return this.exec(`select * from "${tb_name}" ${condition === "" ? "" : "where " + condition}`);
    },
    async helper_insert(tb_name, obj) {
        this.exec(pgp.helpers.insert(obj, null, tb_name));
    },
    async get(tb_name, condition) {
        let conn = null;
        try {
            conn = await cineclick_db.connect();
            return await conn.oneOrNone(`select * from "${tb_name}" where ${condition}`);
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.done();
        }
    },
    async conn_execute(func) {
        let conn = null;
        try {
            conn = await cineclick_db.connect();
            await func(conn);
        } catch (err) {
            throw err;
        } finally {
            if (conn) conn.done();
        }
    }
// exports.all = async (tb_name) => {
//     let conn = null;
//     try {
//         conn = await cineclick_db.connect();
//         const result = await conn.any(`SELECT * FROM ${tb_name}`);
//         return result;
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) conn.done();
//     }
// };
// exports.add_all = async (tb_name, list) => {
//     let conn = null;
//     try {
//         conn = await cineclick_db.connect();
//         let jobs = [];
//         for (let obj of list) {
//             let sql = pgp.helpers.insert(obj, null, tb_name);
//             jobs.push(conn.any(sql));
//         }
//         await Promise.all(jobs);
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) conn.done();
//     }
// };
// exports.get = async (condition, tb_name) => {
//     let conn = null;
//     try {
//         conn = await cineclick_db.connect();
//         let sql = `SELECT * FROM ${tb_name} WHERE ${condition}`
//         const result = await conn.any(sql);
//         return result;
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) conn.done();
//     }
// };
// exports.add = async (tb_name, obj) => {
//     let conn = null;
//     try {
//         conn = await cineclick_db.connect();
//         let sql = pgp.helpers.insert(obj, null, tb_name);
//         const result = await conn.any(sql);
//         return result;
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) conn.done();
//     }
// }
// exports.update = async (tb_name, condition, update) => {
//     let conn = null;
//     try {
//         conn = await cineclick_db.connect();
//         let sql = `UPDATE ${tb_name} SET ${update} WHERE ${condition}`
//         const result = await conn.any(sql);
//         return result;
//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) conn.done();
//     }
// }
// 
}
