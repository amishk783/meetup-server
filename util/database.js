const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-com", "root", "J2cgnftw9810@#$", {
  dialect: "mysql",
    host: "localhost",
  logging:console.log
});

module.exports = sequelize;
