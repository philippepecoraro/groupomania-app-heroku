require('dotenv').config();
 
const developConnect = {
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

const productionConnect = {
    HOST: "eu-cdbr-west-01.cleardb.com",
    USER: "ba2afdc92fb2f4",
    PASSWORD: process.env.PROD_PASSWORD,
    DB: "heroku_7fdaf929b34f1da",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};

if (process.env.NODE_ENV === 'production') {
    dbConfig = developConnect;
}
else {
    
    dbConfig = productionConnect;
}

module.exports = dbConfig;