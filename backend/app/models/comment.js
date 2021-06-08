const moment = require('moment');
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        text: {
            type: Sequelize.STRING
        },
        signal: {
            type: Sequelize.BOOLEAN, defaultValue: false
        },
        createdAt: {
            type: Sequelize.DATE,
            //formatage de la date et de l'heure
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY HH:mm:ss');
            }
        }

    }, {
        freezeTableName: true

    });

    return Comment;
};