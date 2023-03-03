const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = async () => {
  try {
    const connection = new Sequelize(
      process.env.DB_NAME1,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //   useUTC: false,
        //   timezone: "+05:30", // for reading the data
        // },
        // timezone: "+05:30",
      }
    );

    await connection.authenticate();
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = sequelize;
