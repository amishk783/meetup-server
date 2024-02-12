const Sequelize = require("sequelize");

if (process.env.JAWSDB_URL) {
  const sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: "mysql",
      host: "localhost",
      logging: process.env.NODE_ENV === "production" ? false : console.log,
    }
  );
}

module.exports = sequelize;
