const {Sequelize} =  require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');

// Load env variables from .env file
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: true,
  clientMinMessages: 'notice',
});

// test the connection
async function test(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

test()

module.exports = sequelize;