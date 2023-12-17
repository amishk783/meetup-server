const { Sequelize } = require("sequelize");
const session = Sequelize.define("Sessions", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  data: Sequelize.TEXT,
  expires: Sequelize.DATE,
});
