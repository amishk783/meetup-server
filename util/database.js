const Sequelize = require("sequelize");

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize("node-com", "root", "J2cgnftw9810@#$", {
    dialect: "mysql",
    host: "localhost",
    logging: process.env.NODE_ENV === "production" ? false : console.log,
  });
}

module.exports = sequelize;
