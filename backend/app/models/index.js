require('dotenv').config();
const dbConfig  = require("../config/dbProd.config.js");
const Sequelize = require("sequelize");

    const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
    
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });
console.log("dbConfig.DB:" + dbConfig.DB);
console.log("dbConfig.USER:" + dbConfig.USER);

const groupomania = {};

groupomania.Sequelize = Sequelize;
groupomania.sequelize = sequelize;

groupomania.user = require("./user.js")(sequelize, Sequelize);
groupomania.article = require("./article.js")(sequelize, Sequelize);
groupomania.comment = require("./comment.js")(sequelize, Sequelize);

//Création clés étrangère
groupomania.user.hasOne(groupomania.article, {
    foreignKey: "userId",
    onDelete: "cascade"
});

groupomania.article.belongsTo(groupomania.user, {
    foreignKey: "userId"
});

groupomania.user.hasMany(groupomania.comment, {
    foreignKey: "userId",
    onDelete: "cascade"

});
groupomania.comment.belongsTo(groupomania.user, {
    foreignKey: "userId"

});

groupomania.article.hasMany(groupomania.comment, {
    foreignKey: "articleId",
    onDelete: "cascade"
});
groupomania.comment.belongsTo(groupomania.article, {
    foreignKey: "articleId"


});


module.exports = groupomania;