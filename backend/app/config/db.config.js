require('dotenv').config();
 
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.DEV_PASSWORD,
    DB: "groupomania",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};  