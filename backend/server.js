const express = require("express");
const sequelize = require('./db');
const tripRouter = require('./routes/trips'); // Import trip routes (explained later)
const userRouter = require('./routes/users'); 
const tokenRoutes = require('./routes/token');
const bodyParser = require('body-parser');
const cors = require('cors');

// authentication
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

// Load env variables from .env file
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON data

// Connect to database (consider error handling)
sequelize.sync().then(() => {
  console.log('Database connection successful');
  app.listen(process.env.EXPRESS_SERVER_PORT, () => {
    console.log('Server listening on port 3000');
  });
}).catch(err => {
  console.error('Error connecting to database:', err);
  process.exit(1);
});

// API routes (handled in separate files)
app.use('/api/trips', tripRouter); // Mount trip routes under /api/trips
app.use('/api/users', userRouter);
app.use('/token', tokenRoutes); // refresh token

module.exports = app;