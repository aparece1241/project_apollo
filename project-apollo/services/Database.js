
const { Sequelize } = require("sequelize");
const dbConfigs = require('../config/config.json');


const sequelize = new Sequelize(dbConfigs.development.database, dbConfigs.development.username, dbConfigs.development.password, {
    host: dbConfigs.development.host,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected to mysql database!")

    }).catch((error) => {
        console.log("ERROR:", error);

    })
module.exports = sequelize;
