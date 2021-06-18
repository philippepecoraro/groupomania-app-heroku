require('dotenv').config();
module.exports = {
    HOST: "eu-cdbr-west-01.cleardb.com",
    USER: "ba2afdc92fb2f4",
    PASSWORD: "90f5d244262457e",
    DB: "heroku_7fdaf929b34f1da",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};