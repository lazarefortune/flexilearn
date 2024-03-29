import "dotenv/config";

const env = process.env;

let dbConfig = {};

export default {
    client: "mysql2",
    connection: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASS,
        database: env.DB_NAME,
    },
    migrations: {
        tableName: "migrations",
        directory: "src/database/migrations",
    },
    seeds: {
        directory: "src/database/seeds",
    },
}