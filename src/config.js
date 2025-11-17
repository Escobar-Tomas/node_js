const { config } = require("dotenv");
config();

module.exports = {
    db: 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME
    }
}