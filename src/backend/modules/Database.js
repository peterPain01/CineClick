const fs = require("fs");
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
        return this.exec(`select * from ${tb_name}`);
    },
    async find(tb_name, condition) {
        return this.exec(`select * from ${tb_name} where ${condition}`);
    },
    async helper_insert(tb_name, obj) {
        this.exec(pgp.helpers.insert(obj, null, tb_name));
    },
    async get(tb_name, condition) {
        let conn = null;
        try {
            conn = await cineclick_db.connect();
            return await conn.oneOrNone(`select * from ${tb_name} where ${condition}`);
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
